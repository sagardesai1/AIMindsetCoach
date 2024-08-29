"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import AudioPlayer from "@/components/AudioPlayer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

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
function MindfulnessMeditation() {
  const router = useRouter();
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
          <Card
            x-chunk="dashboard-07-chunk-0"
            className="dark:bg-muted/40 flex-[3]"
          >
            <CardHeader>
              <CardTitle>Listen to your guided exercise</CardTitle>
              <CardDescription>
                A personalized guide to help you with the technique
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AudioPlayer audioFileName={audioFilePath || ""} />
            </CardContent>
          </Card>
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

export default MindfulnessMeditation;
