"use server";

import { recordTechniqueFeedback } from "@/firestore";

export async function updateFeedback(technique: string, liked: boolean) {
  await recordTechniqueFeedback(technique, liked);

  return { completed: true };
}
