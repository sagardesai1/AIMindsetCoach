"use server";
import { generateEmbeddingsInPineconeVectorStore } from "@/lib/langchain";

export async function generateEmbeddings() {
  await generateEmbeddingsInPineconeVectorStore();

  return { completed: true };
}
