"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronLeft, ThumbsDown, ThumbsUp } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { doc, updateDoc, collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AudioPlayer from "@/components/AudioPlayer";
import { Textarea } from "@/components/ui/textarea";
import CircleOfInfluence from "@/components/CircleOfInfluence";

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

const ResultComponent: React.FC = () => {
  const router = useRouter();
  const { user } = useUser();
  const [feedbackDocId, setFeedbackDocId] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const [technique, setTechnique] = useState<Technique | null>(null);
  const [audioFilePath, setAudioFilePath] = useState<string | null>(null);

  useEffect(() => {
    const encodedTechnique = searchParams.get("technique");
    const encodedAudioFilePath = searchParams.get("audioFilePath");

    if (encodedTechnique) {
      // Decode and parse the JSON string back to a Technique object
      const parsedTechnique: Technique = JSON.parse(
        decodeURIComponent(encodedTechnique)
      );
      setTechnique(parsedTechnique);
    }

    if (encodedAudioFilePath) {
      // Decode the audio file path
      setAudioFilePath(decodeURIComponent(encodedAudioFilePath));
    }
  }, [searchParams]);

  const handleFeedback = async (liked: boolean, parsedTechnique: Technique) => {
    if (parsedTechnique && user) {
      try {
        // Reference to the user's feedback collection
        const feedbackCollectionRef = collection(
          db,
          "users",
          user.id,
          "feedback"
        );

        if (feedbackDocId) {
          // Feedback document already exists, update it
          const feedbackDocRef = doc(feedbackCollectionRef, feedbackDocId);
          await updateDoc(feedbackDocRef, {
            liked,
            timestamp: new Date().toISOString(),
          });
        } else {
          // No feedback document exists, create a new one
          const feedbackData = {
            liked,
            technique: parsedTechnique,
            timestamp: new Date().toISOString(),
          };

          const docRef = await addDoc(feedbackCollectionRef, feedbackData);
          setFeedbackDocId(docRef.id); // Save the document ID for future updates
        }

        alert("Your feedback has been recorded. Thank you!");
      } catch (error) {
        console.error("Error recording feedback:", error);
        alert("There was an error recording your feedback. Please try again.");
      }
    }
  };

  if (!technique) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 mt-2">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto grid max-w-[80rem] flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7 dark:bg-muted/40"
                onClick={() => router.push("/mentalhealth")}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                AI Stress Management
              </h1>
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Button
                  className="dark:bg-muted/40"
                  variant="outline"
                  size="sm"
                  onClick={() => router.push("/mentalhealth")}
                >
                  Discard
                </Button>
                <Button
                  className="dark:bg-indigo-500 dark:text-white"
                  size="sm"
                  onClick={() => router.push("/mentalhealth")}
                >
                  Ask Again
                </Button>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card
                  className="dark:bg-muted/40"
                  x-chunk="dashboard-07-chunk-1"
                >
                  <CardHeader>
                    <CardTitle>We hear you</CardTitle>
                    <CardDescription>
                      We know that dealing with stress can be tough, and we're
                      here to help.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="leading-8 text-gray-900">
                      {technique.compassion.empathy}{" "}
                      {technique.compassion.encouragement}
                    </div>
                  </CardContent>
                </Card>
                {audioFilePath && (
                  <Card
                    x-chunk="dashboard-07-chunk-0"
                    className="dark:bg-muted/40"
                  >
                    <CardHeader>
                      <CardTitle>Listen to your guided excercise</CardTitle>
                      <CardDescription>
                        A personalized guide to help you with the technique
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <AudioPlayer audioFileName={audioFilePath} />
                    </CardContent>
                  </Card>
                )}
                {true && (
                  <Card
                    x-chunk="dashboard-07-chunk-0"
                    className="dark:bg-muted/40"
                  >
                    <CardHeader>
                      <CardTitle>
                        Write down your unfiltered thoughts and feelings
                      </CardTitle>
                      <CardDescription>
                        Take this time to be completely honest with yourself,
                        unravel your deep emotions
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        className="min-h-96"
                        placeholder="I feel..."
                      ></Textarea>
                    </CardContent>
                  </Card>
                )}
                {true && (
                  <Card
                    x-chunk="dashboard-07-chunk-0"
                    className="dark:bg-muted/40"
                  >
                    <CardHeader>
                      <CardTitle>Your Circle of Influence Worksheet</CardTitle>
                      <CardDescription>
                        Try it yourself, start typing in the circles
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <CircleOfInfluence />
                    </CardContent>
                  </Card>
                )}
                <Card
                  x-chunk="dashboard-07-chunk-0"
                  className="dark:bg-muted/40"
                >
                  <CardHeader>
                    <CardTitle>{technique.technique.name}</CardTitle>
                    <CardDescription>
                      Your personalized destressing technique
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="leading-8">
                        {technique.technique.description}
                      </div>
                      <ol className="list-decimal list-inside leading-8">
                        {technique.technique.steps.map((step, index) => (
                          <li className="mb-4" key={index}>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                <Card
                  x-chunk="dashboard-07-chunk-3"
                  className="dark:bg-muted/40"
                >
                  <CardHeader>
                    <CardTitle>Action Plan</CardTitle>
                    <CardDescription>
                      A plan curated for your needs
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="leading-8">
                        {technique.actionPlan.description}
                      </div>
                      <ul className="list-disc list-inside leading-8">
                        {technique.actionPlan.plan.map((step, index) => (
                          <li className="mb-4" key={index}>
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
                <Card
                  className="overflow-hidden dark:bg-muted/40"
                  x-chunk="dashboard-07-chunk-4"
                >
                  <CardHeader>
                    <CardTitle>Feedback</CardTitle>
                    <CardDescription>
                      Did you like this response? Your feedback helps our model
                      identify techiqnues that you would like.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-row gap-20 justify-center">
                      <ThumbsUp
                        onClick={() => handleFeedback(true, technique)}
                      />
                      <ThumbsDown
                        onClick={() => handleFeedback(false, technique)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ResultComponent;
