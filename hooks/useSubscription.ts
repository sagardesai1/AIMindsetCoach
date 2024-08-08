"use client";

import { db } from "@/firebase";
import { useUser } from "@clerk/nextjs";
import { doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import useFirebaseAuthToken from "./useFirebaseAuthToken";

// number of generations the free user is allowed to have
const FREE_LIMIT = 1;

function useSubscription() {
  const [hasActiveMembership, setHasActiveMembership] = useState(null);
  const [isOverGenerationLimit, setIsOverGenerationLimit] = useState(false);
  const { user } = useUser();

  useFirebaseAuthToken();

  // Listen to the User document
  const [snapshot, loading, error] = useDocument(
    user && doc(db, "users", user.id),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useEffect(() => {
    if (!snapshot) return;

    const data = snapshot.data();

    if (!data) return;

    setHasActiveMembership(data.hasActiveMembership);

    const numOfGenerations = data.numOfGenerations || 0;

    if (hasActiveMembership) {
      // No limit for pro users
      setIsOverGenerationLimit(false);
    } else {
      // Apply limit for free users
      console.log(
        "Checking if user is over generation limit",
        numOfGenerations,
        FREE_LIMIT
      );

      setIsOverGenerationLimit(numOfGenerations >= FREE_LIMIT);
    }
  }, [snapshot]);

  return { hasActiveMembership, loading, error, isOverGenerationLimit };
}

export default useSubscription;
