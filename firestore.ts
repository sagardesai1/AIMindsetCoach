import { auth } from "@clerk/nextjs/server";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

// Define the type for user preferences
interface UserPreferences {
  liked: string[];
  disliked: string[];
}

// Function to fetch user preferences from Firestore
export const fetchUserPreferences = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not found");
  }
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    const liked = data.likedTechniques
      ? data.likedTechniques.map((item: any) => item.techniqueId)
      : [];
    const disliked = data.dislikedTechniques
      ? data.dislikedTechniques.map((item: any) => item.techniqueId)
      : [];
    return { liked, disliked };
  } else {
    console.log("No such document!");
    return { liked: [], disliked: [] };
  }
};

export const recordTechniqueFeedback = async (
  technique: string,
  liked: boolean
) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not found");
  }

  const userDocRef = doc(db, "users", userId);

  // Check if the document exists and create it if it doesn't
  const userDocSnap = await getDoc(userDocRef);
  if (!userDocSnap.exists()) {
    await setDoc(userDocRef, {
      likedTechniques: [],
      dislikedTechniques: [],
    });
  }

  if (liked) {
    await updateDoc(userDocRef, {
      likedTechniques: arrayUnion({
        techniqueId: technique,
        timestamp: new Date(),
      }),
    });
  } else {
    await updateDoc(userDocRef, {
      dislikedTechniques: arrayUnion({
        techniqueId: technique,
        timestamp: new Date(),
      }),
    });
  }
};
