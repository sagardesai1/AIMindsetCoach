"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

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

interface CBT {
  negativeBeliefPrompt: string;
  negativeBeliefExample: string;
  contradictBeliefNegativePrompt: string;
  contradictBeliefNegativeExample: string;
  positiveBeliefPrompt: string;
  positiveBeliefPromptExample: string;
}

function Breathing() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [technique, setTechnique] = useState<Technique | null>(null);
  const [cbtPrompts, setCbtPrompts] = useState<CBT | null>(null);

  useEffect(() => {
    const encodedTechnique = searchParams.get("technique");
    const encodedCBT = searchParams.get("cbtJSON");

    if (encodedTechnique) {
      const parsedTechnique: Technique = JSON.parse(
        decodeURIComponent(encodedTechnique)
      );
      setTechnique(parsedTechnique);
    }

    if (encodedCBT) {
      const parsedCbt: CBT = JSON.parse(decodeURIComponent(encodedCBT));
      setCbtPrompts(parsedCbt);
    }
  }, [searchParams]);

  return (
    <div className="bg-white py-12 sm:py-12">
      <div className="mx-auto min-h-screen max-w-screen-2xl px-6 lg:px-8 space-y-6">
        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            <Button
              className="dark:bg-indigo-500 dark:text-white space-x-2"
              size="sm"
              onClick={() => router.push("/mentalhealth")}
            >
              <RefreshCcw className="h-4 w-4" />
              <span>Ask Again</span>
            </Button>
          </div>
        </div>
        <Card className="dark:bg-muted/40" x-chunk="dashboard-07-chunk-1">
          <CardHeader>
            <CardTitle>We hear you</CardTitle>
            <CardDescription>
              We know that dealing with stress can be tough, and we're here to
              help.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="leading-8 text-gray-900">
              {technique?.compassion.empathy}{" "}
              {technique?.compassion.encouragement}
            </div>
          </CardContent>
        </Card>
        <div className="flex flex-row space-x-4">
          <div className="flex-[3] space-y-4">
            <Card x-chunk="dashboard-07-chunk-0" className="dark:bg-muted/40 ">
              <CardHeader>
                <CardTitle>Negative beliefs</CardTitle>
                <CardDescription>
                  <span className="block mt-2">
                    <span className="font-semibold text-black text-base">
                      Prompt:{" "}
                    </span>
                    <span className="text-base">
                      {cbtPrompts?.negativeBeliefPrompt}
                    </span>
                  </span>
                  <span className="block mt-2">
                    <span className="font-semibold text-black text-base">
                      Example:{" "}
                    </span>
                    <span className="text-base">
                      {cbtPrompts?.negativeBeliefExample}
                    </span>
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  className="min-h-96"
                  placeholder="Start typing here..."
                ></Textarea>
              </CardContent>
            </Card>

            <Card x-chunk="dashboard-07-chunk-0" className="dark:bg-muted/40">
              <CardHeader>
                <CardTitle>Contradict negative beliefs</CardTitle>
                <CardDescription>
                  <span className="block mt-2">
                    <span className="font-semibold text-black text-base">
                      Prompt:{" "}
                    </span>
                    <span className="text-base">
                      {cbtPrompts?.contradictBeliefNegativePrompt}
                    </span>
                  </span>
                  <span className="block mt-2">
                    <span className="font-semibold text-black text-base">
                      Example:{" "}
                    </span>
                    <span className="text-base">
                      {cbtPrompts?.contradictBeliefNegativeExample}
                    </span>
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  className="min-h-96"
                  placeholder="Start typing here..."
                ></Textarea>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-07-chunk-0" className="dark:bg-muted/40">
              <CardHeader>
                <CardTitle>Positive beliefs</CardTitle>
                <CardDescription>
                  <span className="block mt-2">
                    <span className="font-semibold text-black text-base">
                      Prompt:{" "}
                    </span>
                    <span className="text-base">
                      {cbtPrompts?.positiveBeliefPrompt}
                    </span>
                  </span>
                  <span className="block mt-2">
                    <span className="font-semibold text-black text-base">
                      Example:{" "}
                    </span>
                    <span className="text-base">
                      {cbtPrompts?.positiveBeliefPromptExample}
                    </span>
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  className="min-h-96"
                  placeholder="Start typing here..."
                ></Textarea>
              </CardContent>
            </Card>
          </div>
          <Card
            x-chunk="dashboard-07-chunk-0"
            className="dark:bg-muted/40 flex-[1]"
          >
            <CardHeader>
              <CardTitle>{technique?.technique.name}</CardTitle>
              <CardDescription>
                Your personalized destressing technique
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="leading-8">
                  {technique?.technique.description}
                </div>
                <ol className="list-decimal list-inside leading-8">
                  {technique?.technique.steps.map((step, index) => (
                    <li className="mb-4" key={index}>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card x-chunk="dashboard-07-chunk-3" className="dark:bg-muted/40">
          <CardHeader>
            <CardTitle>Action Plan</CardTitle>
            <CardDescription>A plan curated for your needs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="leading-8">
                {technique?.actionPlan.description}
              </div>
              <ul className="list-disc list-inside leading-8">
                {technique?.actionPlan.plan.map((step, index) => (
                  <li className="mb-4" key={index}>
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Breathing;
