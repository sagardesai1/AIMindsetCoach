"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles } from "lucide-react";
import React, { useState, FormEvent, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { generateEmbeddings } from "@/actions/generateEmbeddings";
import { generateLangchainCompletion } from "@/lib/langchain";
import { getTechnique } from "@/actions/getTechnique";
import { useUser } from "@clerk/nextjs";
import LoadingSpinner from "@/components/LoadingSpinner";
import useSubscription from "@/hooks/useSubscription";
import UpgradeBanner from "@/components/UpgradeBanner";
import useFirebaseAuthToken from "@/hooks/useFirebaseAuthToken";
import { useToast } from "@/components/ui/use-toast";
import textToSpeech, { deleteAudioFiles } from "@/actions/speechSDK";
import {
  affirmationsCompletion,
  cbtCompletion,
  circleOfInfluenceCompletion,
  journalingCompletion,
  mindfulMeditationCompletion,
} from "@/actions/techniqueCompletions";

interface Technique {
  compassion: {
    empathy: string;
    encouragement: string;
  };
  technique: {
    name: string;
    description: string;
    steps: string[];
  };
  actionPlan: {
    description: string;
    plan: string[];
  };
}

const YourComponent: React.FC = () => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMeditationLoading, setIsMeditationLoading] = useState(false);
  const router = useRouter();
  const { user } = useUser();
  const textAreaRef = useRef<HTMLTextAreaElement>(null); // Explicitly type the ref
  const { hasActiveMembership, isOverGenerationLimit } = useSubscription();
  const { toast } = useToast();

  useFirebaseAuthToken();

  useEffect(() => {
    // Adjust the height of the textarea based on its content
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [message]);

  // async function stuff() {
  //   await generateEmbeddings();
  // }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // stuff();
    if (!user) {
      return;
    }
    setIsLoading(true);
    try {
      // Check if the user is over the generation limit
      if (!hasActiveMembership && isOverGenerationLimit) {
        toast({
          variant: "destructive",
          title: "Uh oh",
          description:
            "You have reached the limit of free generations. Upgrade to pro to keep asking advice!",
        });
        setIsLoading(false); // Reset loading state
        return;
      }

      const techniqueJSON = await getTechnique(message);

      let parsedTechnique: Technique | null = null;

      // Extract the JSON part from the reply
      const jsonResponse = techniqueJSON?.match(/```json\n([\s\S]*?)\n```/);
      if (!jsonResponse) {
        throw new Error("Invalid response format");
      }

      // Parse the JSON string
      parsedTechnique = JSON.parse(jsonResponse[1]);

      switch (parsedTechnique?.technique.name.toLowerCase()) {
        case "mindfulness meditation": {
          try {
            console.log(
              "Received langchain result and parsed. Calling Mindful Meditation now."
            );
            const audioTranscription = await mindfulMeditationCompletion(
              message
            );
            console.log("Received Mindful Meditation response.");
            if (audioTranscription) {
              console.log("Calling Text to Speech.");
              const textToSpeechResponse = await textToSpeech(
                audioTranscription
              );
              console.log("Received Text to Speech response.");
              if (textToSpeechResponse.success) {
                console.log(
                  `Audio file saved at: ${textToSpeechResponse.audioFileName}`
                );
                const queryParams = `technique=${encodeURIComponent(
                  JSON.stringify(parsedTechnique)
                )}&audioFilePath=${encodeURIComponent(
                  textToSpeechResponse.audioFileName || ""
                )}`;
                router.push(`/mindfulnessmeditation?${queryParams}`);
              } else {
                console.error("Mindful Meditation failed.");
              }
            }
          } finally {
            setIsMeditationLoading(false); // Ensure meditation loading state is reset
          }
          break;
        }

        case "journaling": {
          const journalingResponse = await journalingCompletion(message);

          // Parse the JSON response directly
          const journaling = JSON.parse(journalingResponse || "");

          const queryParams = `technique=${encodeURIComponent(
            JSON.stringify(parsedTechnique)
          )}&journalingJSON=${encodeURIComponent(JSON.stringify(journaling))}`;

          router.push(`/journaling?${queryParams}`);
          break;
        }

        case "affirmations": {
          const affirmationsResponse = await affirmationsCompletion(message);

          const affirmations: string[] = JSON.parse(affirmationsResponse || "");

          // Construct query parameters
          const queryParams = `technique=${encodeURIComponent(
            JSON.stringify(parsedTechnique)
          )}&affirmationsJSON=${encodeURIComponent(
            JSON.stringify(affirmations)
          )}`;

          // Navigate to the affirmations page
          router.push(`/affirmations?${queryParams}`);
          break;
        }

        case "cognitive behavior therapy - challenging negative thoughts": {
          const cbtResponse = await cbtCompletion(message);

          const cbt = JSON.parse(cbtResponse || "");

          const queryParams = `technique=${encodeURIComponent(
            JSON.stringify(parsedTechnique)
          )}&cbtJSON=${encodeURIComponent(JSON.stringify(cbt))}`;

          router.push(`/cbt?${queryParams}`);
          break;
        }

        case "circle of influence": {
          const circleofinfluenceResponse = await circleOfInfluenceCompletion(
            message
          );

          const circleofinfluence = JSON.parse(circleofinfluenceResponse || "");

          const queryParams = `technique=${encodeURIComponent(
            JSON.stringify(parsedTechnique)
          )}&circleOfInfluenceJSON=${encodeURIComponent(
            JSON.stringify(circleofinfluence)
          )}`;

          router.push(`/circleofinfluence?${queryParams}`);
          break;
        }

        // case "4-7-8 breathing technique": {
        //   const queryParams = `technique=${encodeURIComponent(
        //     JSON.stringify(parsedTechnique)
        //   )}&audioFilePath=${encodeURIComponent("")}`;
        //   router.push(`/breathing?${queryParams}`);
        //   break;
        // }

        // case "5-4-3-2-1 grounding technique": {
        //   const queryParams = `technique=${encodeURIComponent(
        //     JSON.stringify(parsedTechnique)
        //   )}&audioFilePath=${encodeURIComponent("")}`;
        //   router.push(`/breathing?${queryParams}`);
        //   break;
        // }

        // case "box breathing": {
        //   const queryParams = `technique=${encodeURIComponent(
        //     JSON.stringify(parsedTechnique)
        //   )}&audioFilePath=${encodeURIComponent("")}`;
        //   router.push(`/breathing?${queryParams}`);
        //   break;
        // }

        // case "alternate nostril breathing (nadi shodhana)": {
        //   const queryParams = `technique=${encodeURIComponent(
        //     JSON.stringify(parsedTechnique)
        //   )}&audioFilePath=${encodeURIComponent("")}`;
        //   router.push(`/breathing?${queryParams}`);
        //   break;
        // }

        // case "progressive muscle relaxation": {
        //   const queryParams = `technique=${encodeURIComponent(
        //     JSON.stringify(parsedTechnique)
        //   )}&audioFilePath=${encodeURIComponent("")}`;
        //   router.push(`/breathing?${queryParams}`);
        //   break;
        // }

        default: {
          const queryParams = `technique=${encodeURIComponent(
            JSON.stringify(parsedTechnique)
          )}`;
          router.push(`/result?${queryParams}`);
        }
      }

      await new Promise((resolve) => setTimeout(resolve, 3000));

      if (!hasActiveMembership) {
        // Manually increment the numOfGenerations field in the Firestore database
        const userDocRef = doc(db, "users", user.id);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const currentNumOfGenerations =
            userDocSnap.data().numOfGenerations || 0;
          await updateDoc(userDocRef, {
            numOfGenerations: currentNumOfGenerations + 1,
          });
        }
      }
    } catch (error) {
      console.error("Error generating technique:", error);
    } finally {
      setIsLoading(false); // Ensure loading state is reset
    }
  };

  return (
    <div className="">
      <UpgradeBanner />
      <div className="relative flex h-[calc(100vh-7rem)] min-h-[calc(100vh-7rem)] flex-col rounded-xl p-4 max-w-6xl mx-auto">
        {!isLoading && !isMeditationLoading ? (
          <>
            <div className="pt-16 w-4/5 mx-auto">
              <h1 className="leading-8 text-2xl font-bold text-gray-900 sm:text-3xl mb-6">
                Hey there, great to meet you! I’m{" "}
                <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 inline-block text-transparent bg-clip-text">
                  RewiredMind
                </span>
                , your personal AI stress manager.
              </h1>
              <p className="mb-3 text-lg leading-8 text-gray-600">
                My goal is to guide you through stressful times and share
                techniques to help you feel better.
              </p>
              <p className="text-lg leading-8 text-gray-600">
                What's been stressing you out lately?
              </p>
            </div>
            <div className="flex-1" />
            <form
              className="relative flex flex-row items-center p-1 rounded-3xl border bg-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-indigo-200"
              onSubmit={handleSubmit}
            >
              <Textarea
                ref={textAreaRef}
                id="message"
                rows={1}
                placeholder="Type your message here, be super specific..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="ml-5 min-h-0 max-h-64 resize-none border-0 p-0 shadow-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 flex-grow"
              />
              <div className="flex self-end items-center ml-4">
                <Button
                  type="submit"
                  className="gap-1.5 bg-gradient-to-r rounded-full from-indigo-500 via-purple-500 to-pink-500"
                  disabled={!message}
                >
                  Get advice
                  <Sparkles className="size-3.5" />
                </Button>
              </div>
            </form>
          </>
        ) : isMeditationLoading ? (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-5rem)] min-h-[calc(100vh-5rem)] p-4 text-center mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
              Starting your meditation session.
            </h2>
            <p className="text-lg leading-8 text-gray-600 mb-4">
              We're preparing a personalized meditation to help you relax.
            </p>
            <LoadingSpinner />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-5rem)] min-h-[calc(100vh-5rem)] p-4 text-center mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
              We hear you.
            </h2>
            <p className="text-lg leading-8 text-gray-600 mb-4">
              We know that dealing with stress can be tough, and we're here to
              help.
            </p>
            <p className="text-lg leading-8 text-gray-600">
              Hang tight for a moment while we find the best way to assist you.
            </p>
            <LoadingSpinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default YourComponent;
