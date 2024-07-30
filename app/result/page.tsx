"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";
import { ChevronLeft, ThumbsDown, ThumbsUp } from "lucide-react";
import { updateFeedback } from "@/actions/firestoreActions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Technique {
  empathy: string;
  techniqueActionPlanExplanation: string;
  encouragement: string;
  technique: {
    name: string;
    description: string;
  };
  actionPlan: string[];
}

const ResultComponent: React.FC = () => {
  const searchParams = useSearchParams();
  const techniqueJSON = searchParams.get("technique");
  const userStress = searchParams.get("userStress");

  let parsedTechnique: Technique | null = null;
  //console.log(techniqueJSON);
  // Extract the JSON part from the reply
  const jsonResponse = techniqueJSON?.match(/```json\n([\s\S]*?)\n```/);
  if (!jsonResponse) {
    throw new Error("Invalid response format");
  }
  // Parse the JSON string
  parsedTechnique = JSON.parse(jsonResponse[1]);

  // if (techniqueJSON) {
  //   try {
  //     technique = JSON.parse(techniqueJSON);
  //   } catch (error) {
  //     console.error("Error parsing technique JSON:", error);
  //   }
  // }

  // const handleFeedback = async (liked: boolean) => {
  //   if (parsedTechnique) {
  //     try {
  //       await updateFeedback(technique, liked);
  //       alert("Your feedback has been recorded. Thank you!");
  //     } catch (error) {
  //       console.error("Error recording feedback:", error);
  //       alert("There was an error recording your feedback. Please try again.");
  //     }
  //   }
  // };

  if (!parsedTechnique) {
    return <div>Loading...</div>;
  }

  // return (
  //   <div className="relative flex h-[calc(100vh-5rem)] min-h-[calc(100vh-5rem)] flex-col text-center justify-center max-w-7xl mx-auto">
  //     <div className="mb-10">
  //       <h2 className="italic">"{userStress}"</h2>
  //     </div>

  //     <div className="border rounded-lg p-6 border-indigo-200 shadow-md">
  //       <h1 className="font-semibold mb-2">
  //         Your personalized stress management technique:
  //       </h1>
  //       <p className="italic">{parsedTechnique.empathy}</p>

  //       <p className="mt-4">{parsedTechnique.techniqueActionPlanExplanation}</p>

  //       <p className="mt-4 italic">{parsedTechnique.encouragement}</p>
  //     </div>
  //     <div className="border rounded-lg p-6 border-indigo-200 shadow-md">
  //       <h2 className="font-bold mt-4">{parsedTechnique.technique.name}</h2>
  //       <p>{parsedTechnique.technique.description}</p>
  //     </div>
  //     <div className="border rounded-lg p-6 border-indigo-200 shadow-md">
  //       <h3 className="font-semibold mt-4">Action Plan:</h3>
  //       <ul className="list-disc list-inside">
  //         {parsedTechnique.actionPlan.map((step, index) => (
  //           <li key={index}>{step}</li>
  //         ))}
  //       </ul>
  //     </div>
  //     <div className="mt-10">
  //       <span>Did you like this response?</span>
  //       <div className="flex flex-row gap-20 justify-center mt-6">
  //         <ThumbsUp onClick={() => handleFeedback(true)} />
  //         <ThumbsDown onClick={() => handleFeedback(false)} />
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 mt-2">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto grid max-w-[65rem] flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7 dark:bg-muted/40"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                AI Stress Management
              </h1>
              {/* <Badge variant="outline" className="ml-auto sm:ml-0">
                In stock
              </Badge> */}
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Button
                  className="dark:bg-muted/40"
                  variant="outline"
                  size="sm"
                >
                  Discard
                </Button>
                <Button
                  className="dark:bg-indigo-500 dark:text-white"
                  size="sm"
                >
                  Save
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
                    <div className="leading-8">
                      {parsedTechnique.empathy}{" "}
                      {parsedTechnique.techniqueActionPlanExplanation}{" "}
                      {parsedTechnique.encouragement}
                    </div>
                  </CardContent>
                </Card>
                <Card
                  x-chunk="dashboard-07-chunk-0"
                  className="dark:bg-muted/40"
                >
                  <CardHeader>
                    <CardTitle>{parsedTechnique.technique.name}</CardTitle>
                    <CardDescription>
                      Your personalized destressing technique
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="leading-8">
                        {parsedTechnique.technique.description}
                      </div>
                      {/* <div className="grid gap-3">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
                          className="min-h-32"
                        />
                      </div> */}
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
                      <div className="grid gap-3">
                        <ul className="list-disc list-inside leading-8">
                          {parsedTechnique.actionPlan.map((step, index) => (
                            <li className="mb-4" key={index}>
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>
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
                      {/* <ThumbsUp onClick={() => handleFeedback(true)} />
                      <ThumbsDown onClick={() => handleFeedback(false)} /> */}
                      {/* <Image
                        alt="Product image"
                        className="aspect-square w-full rounded-md object-cover"
                        height="300"
                        src="/placeholder.svg"
                        width="300"
                      />
                      <div className="grid grid-cols-3 gap-2">
                        <button>
                          <Image
                            alt="Product image"
                            className="aspect-square w-full rounded-md object-cover"
                            height="84"
                            src="/placeholder.svg"
                            width="84"
                          />
                        </button>
                        <button>
                          <Image
                            alt="Product image"
                            className="aspect-square w-full rounded-md object-cover"
                            height="84"
                            src="/placeholder.svg"
                            width="84"
                          />
                        </button>
                        <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                          <Upload className="h-4 w-4 text-muted-foreground" />
                          <span className="sr-only">Upload</span>
                        </button>
                      </div> */}
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
