"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles } from "lucide-react";
import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { generateEmbeddings } from "@/actions/generateEmbeddings";
import { generateLangchainCompletion } from "@/lib/langchain";
import { getTechnique } from "@/actions/getTechnique";
import LoadingSpinner from "@/components/LoadingSpinner";

const YourComponent: React.FC = () => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // async function stuff() {
  //   await generateEmbeddings();
  // }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // stuff();
    setIsLoading(true);

    try {
      const technique = await getTechnique(message);
      // const technique = "hi";
      await new Promise((resolve) => setTimeout(resolve, 3000));
      router.push(
        `/result?technique=${encodeURIComponent(
          technique
        )}&userStress=${encodeURIComponent(message)}`
      );
    } catch (error) {
      console.error("Error generating technique:", error);
      setIsLoading(false); // Ensure we reset the loading state in case of error
    }
  };

  return (
    <div className="relative flex h-[calc(100vh-5rem)] min-h-[calc(100vh-5rem)] flex-col rounded-xl p-4 max-w-6xl mx-auto">
      {!isLoading ? (
        <>
          <div className="pt-40 w-4/5 mx-auto">
            <h1 className="leading-8 text-2xl font-bold text-gray-900 sm:text-3xl mb-6">
              Hey there, great to meet you! I’m{" "}
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 inline-block text-transparent bg-clip-text">
                RewireMind
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
            className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
            onSubmit={handleSubmit}
            x-chunk="dashboard-03-chunk-1"
          >
            <Textarea
              id="message"
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
            />
            <div className="flex items-center p-3 pt-0">
              <Button
                type="submit"
                className="ml-auto gap-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
              >
                Generate a technique
                <Sparkles className="size-3.5" />
              </Button>
            </div>
          </form>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-5rem)] min-h-[calc(100vh-5rem)] p-4 text-center w-3/5 mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            We hear you.
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            We know that dealing with stress can be tough, and we're here to
            help. We're working on gathering a personalized technique just for
            you.
          </p>
          <p className="text-md text-gray-600">
            Hang tight for a moment while we find the best way to assist you.
          </p>
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default YourComponent;
