"use server";
import { generateLangchainCompletion } from "@/lib/langchain";
import { auth } from "@clerk/nextjs/server";

export async function getTechnique(userStress: string) {
  auth().protect();
  const { userId } = await auth();

  //   Generate AI Response
  const reply = await generateLangchainCompletion(userStress);

  return reply;
}
