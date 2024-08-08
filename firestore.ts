import { auth } from "@clerk/nextjs/server";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db, firebaseAuth } from "./firebase";
import { signInWithCustomToken } from "firebase/auth";

// Define the type for user preferences
interface UserPreferences {
  liked: string[];
  disliked: string[];
}

// Function to fetch user preferences from Firestore
export const fetchUserPreferences = async () => {
  const { userId, getToken } = await auth();
  if (!userId) {
    throw new Error("User not found");
  }

  const token = await getToken({ template: "integration_firebase" });
  if (token) {
    // Sign in to Firebase using the custom token
    await signInWithCustomToken(firebaseAuth, token || "");
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
  }
};
