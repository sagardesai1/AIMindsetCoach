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

  // Define the output schema using zod
  const outputParser = StructuredOutputParser.fromZodSchema(
    z.object({
      compassion: z.object({
        empathy: z
          .string()
          .describe(
            "Provide 1 sentence empathizing with user for the situation they are in."
          ),
        encouragement: z
          .string()
          .describe(
            "Provide 1 sentence to encourage the user to start working on the action plan and technique."
          ),
      }),
      technique: z.object({
        name: z
          .string()
          .describe(
            "Provide 1 specific technique that is the most personalized to the user’s situation to help them manage their stress."
          ),
        description: z
          .string()
          .describe(
            "Provide 1 sentence explaining the technique and how it will help the user with the situation they are in."
          ),
        steps: z
          .array(z.string())
          .describe(
            "Provide a detailed set of instructions on how to do the technique (do not use bullet points or numbered list to display results)."
          ),
      }),
      actionPlan: z.object({
        description: z
          .string()
          .describe(
            "Provide 1 sentence to encourage the user to start working on the action plan."
          ),
        plan: z
          .array(z.string())
          .length(3)
          .describe(
            "Provide an action plan that has 3 steps (do not use bullet points or numbered list to display results) for how the user can address the situation at hand such that they are no longer stressed by the situation (this does not need to involve the technique mentioned earlier."
          ),
      }),
    })
  );

  // Define a prompt template for generating search queries based on user preference history
  console.log("--- Defining a prompt template... ---");
  const historyAwarePrompt = ChatPromptTemplate.fromMessages([
    ["user", "{input}"],
    [
      "user",
      "Generate a search query to look up in order to get correct technique relevant to me.",
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
    [
      "system",
      "You are an AI Stress Management Coach. Provide 1 specific technique that is the most personalized to the user’s situation to help them manage their stress. Below the technique provide a detailed list of instructions on how to do the technique. Then, provide an action plan that has 3 steps for how the user can address the situation at hand such that they are no longer stressed by the situation (this does not need to involve the technique mentioned earlier). If the ‘Media Type’ is ‘Audio’, generate an SSML transcription that will be used for a guided meditation audio recording. \n\n{context}. Answer the users question as best as possible in this format: \n{format_instructions}.",
    ],
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
    // user_liked_technique_preferences: liked,
    // user_disliked_technique_preferences: disliked,
    input: userStress,
    format_instructions: outputParser.getFormatInstructions(),
  });

  // Print the result to the console
  console.log("response.context", response.answer);
  return response.answer;
};
