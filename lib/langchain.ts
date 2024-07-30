import { ChatOpenAI } from "@langchain/openai";
import { CSVLoader } from "@langchain/community/document_loaders/fs/csv";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "@langchain/openai";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  AIMessagePromptTemplate,
  HumanMessagePromptTemplate,
} from "@langchain/core/prompts";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";
import {
  HumanMessage,
  AIMessage,
  SystemMessage,
} from "@langchain/core/messages";
import pineconeClient from "./pinecone";
import { PineconeStore } from "@langchain/pinecone";
import { PineconeConfigurationError } from "@pinecone-database/pinecone/dist/errors";
import { Index, RecordMetadata } from "@pinecone-database/pinecone";
import { auth } from "@clerk/nextjs/server";
import { fetchUserPreferences } from "@/firestore";
import { StructuredOutputParser } from "langchain/output_parsers";
import { z } from "zod";
import { RunnableSequence } from "@langchain/core/runnables";

// Initalize the OpenAI model with API key and model name
const model = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  modelName: "gpt-4o-mini",
});

export const indexName = "aimindsetcoach";

export async function generateDocs() {
  // Load the CSV data from our directory
  console.log("--- Loading CSV document... ----");
  const loader = new CSVLoader(
    "/Users/sagar/Documents/AIMindsetCoach/StressManagementTechniques.csv"
  );
  const docs = await loader.load();

  // Split the loaded document into smaller parts for easier processing
  console.log("--- Splitting the document into smaller parts... ---");
  const splitter = new RecursiveCharacterTextSplitter();

  const splitDocs = await splitter.splitDocuments(docs);
  console.log(`--- Split into ${splitDocs.length} parts ---`);

  return splitDocs;
}

export async function generateEmbeddingsInPineconeVectorStore() {
  let pineconeVectorStore;

  // Generate embeddings (numerical representations) for the split documents
  console.log("--- Generating embeddings... ---");
  const embeddings = new OpenAIEmbeddings();

  const index = await pineconeClient.index(indexName);

  // Load CSV file and split document
  const splitDocs = await generateDocs();

  console.log(
    `--- Storing the embeddings in the ${indexName} Pinecone vector store... ---`
  );

  pineconeVectorStore = await PineconeStore.fromDocuments(
    splitDocs,
    embeddings,
    {
      pineconeIndex: index,
    }
  );

  return pineconeVectorStore;
}

export async function generatePineconeVectorStore() {
  const embeddings = new OpenAIEmbeddings();
  const index = await pineconeClient.index(indexName);
  let pineconeVectorStore = PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex: index,
  });

  return pineconeVectorStore;
}

export const generateLangchainCompletion = async (userStress: string) => {
  let pineconeVectorStore;

  pineconeVectorStore = await generatePineconeVectorStore();
  if (!pineconeVectorStore) {
    throw new Error("Pinecone vector store not found");
  }

  // Create a retriever to search through the vector store
  console.log("--- Creating a retriever... ---");
  const retriever = pineconeVectorStore.asRetriever();

  // Fetch user technique preferences and messages from Firestore
  const userPreferences = await fetchUserPreferences();
  const { liked, disliked } = userPreferences;

  // Define the output schema using zod
  const outputParser = StructuredOutputParser.fromZodSchema(
    z.object({
      empathy: z
        .string()
        .describe(
          "Provide 1 sentence empathizing with user for the situation they are in."
        ),
      techniqueActionPlanExplanation: z
        .string()
        .describe(
          "Provide 1 sentence explaining how the technique and action will help the user with in their certain situation."
        ),
      encouragement: z
        .string()
        .describe(
          "Provide 1 sentence to encourage the user to start working on the action plan and technique."
        ),
      technique: z.object({
        name: z.string().describe("Name of technique"),
        description: z.string().describe("Description of technique"),
      }),
      actionPlan: z
        .array(z.string())
        .length(3)
        .describe(
          "Action plan with 3 steps in bullet point format for how the user can remedy the situation."
        ),
    })
  );

  // Define a prompt template for generating search queries based on user preference history
  console.log("--- Defining a prompt template... ---");
  const historyAwarePrompt = ChatPromptTemplate.fromMessages([
    ["user", "{input}"],
    [
      "user",
      "Given my previous liked preferences: \n{user_liked_technique_preferences} and my disliked preferences: \n{user_disliked_technique_preferences} on stress management techniques, generate a search query to look up in order to get correct technique relevant to me.",
    ],
  ]);

  // Create a history-aware retriever chain that uses the mode, retriever, and prompt
  console.log("--- Creating a history-aware retriever chain... ---");
  const historyAwareRetrievalChain = await createHistoryAwareRetriever({
    llm: model,
    retriever,
    rephrasePrompt: historyAwarePrompt,
  });

  // Define a prompt template for answering questions based on retrieved context
  console.log("--- Defining a prompt template for answering quesitions... ---");
  const historyAwareRetrievalPrompt = ChatPromptTemplate.fromMessages([
    "system",
    "You are an AI Stress Management Coach, your job is to take the user’s problem and give 1 specific destressing technique personalized to the user’s situation on how to manage their stress. Below the technique also provide an action plan that has 3 steps in bullet point format for how the user can remedy the situation. Answer the users question as best as possible in this format: \n{format_instructions}. Also here are the user's previous liked stress stress management techniques followed by their disliked stress management techniques: \n\n{context}",
    ...liked, // Insert the actual user preference here
    ...disliked,
    ["user", "{input}"],
  ]);

  // Create a chain to combine the retrieved documents into a coherent response
  console.log("--- Creating a document combining chain... ---");
  const historyAwareCombineDocsChain = await createStuffDocumentsChain({
    llm: model,
    prompt: historyAwareRetrievalPrompt,
  });

  // Create the main retrieval chain that combines the history-aware retriever and document combining chains
  console.log("--- Creating the main retrieval chain... ---");
  const conversationalRetrievalChain = await createRetrievalChain({
    retriever: historyAwareRetrievalChain,
    combineDocsChain: historyAwareCombineDocsChain,
  });

  console.log("--- Running the chain with a sample conversation... ---");
  const response = await conversationalRetrievalChain.invoke({
    user_liked_technique_preferences: liked,
    user_disliked_technique_preferences: disliked,
    input: userStress,
    format_instructions: outputParser.getFormatInstructions(),
  });

  // Print the result to the console
  console.log("response: ", response);
  console.log("response.context", response.context);
  console.log("response.context", response.answer);
  return response.answer;
};
