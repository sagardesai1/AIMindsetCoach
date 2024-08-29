"use client";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { PauseIcon, PlayIcon } from "lucide-react";
import { useRef, useState } from "react";

const audioFeatures = [
  {
    name: "Mind-Body Connection Exercises",
    description: "“I have a headache”",
    image:
      "https://images.unsplash.com/photo-1644594989568-e265aa255b71?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    audioSrc:
      "https://firebasestorage.googleapis.com/v0/b/ai-mindset-coach.appspot.com/o/landing-page-samples-audios%2FMind-Body-Connection-Excercise.wav?alt=media&token=6e321ddf-1265-4251-ad4b-2c2b4f9b07f4",
  },
  {
    name: "Personalized Affirmations",
    description: "“I’m feeling low”",
    image:
      "https://images.unsplash.com/photo-1700350951645-ddeb1f777d9b?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    audioSrc:
      "https://firebasestorage.googleapis.com/v0/b/ai-mindset-coach.appspot.com/o/landing-page-samples-audios%2FPersonalized-Affirmations.wav?alt=media&token=71db69c7-ae0e-4755-9a64-faff4ed23ece",
  },
  {
    name: "Guided Visualization and Imagery",
    description: "“I’m stressed about a meeting at work”",
    image:
      "https://images.unsplash.com/photo-1530564277628-b59e189a3336?q=80&w=3443&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3",
    audioSrc:
      "https://firebasestorage.googleapis.com/v0/b/ai-mindset-coach.appspot.com/o/landing-page-samples-audios%2FGuided-Visualization-Imagery.wav?alt=media&token=f9722b0c-32f9-4a6f-940e-e299b2ab79f1",
  },
];

const textFeatures = [
  {
    name: "Journaling exercises",
    description: "“I had a fight with my husband”",
    subText:
      "Journaling will help you articulate and process the complex emotions from the fight with your husband, enabling you to find clarity and insights.",
    image:
      "https://images.unsplash.com/photo-1470076491063-fd42fb1ad4b9?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Cognitive behavioral therapy",
    description: "“I’m having a lot of anxiety”",
    subText:
      "Journaling will help you articulate and process the complex emotions from the fight with your husband, enabling you to find clarity and insights.",
    image:
      "https://images.unsplash.com/photo-1519174239095-979872ccb42c?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Circle of Influence",
    description: "“I’m having anxiety about my finances”",
    subText:
      "Journaling will help you articulate and process the complex emotions from the fight with your husband, enabling you to find clarity and insights.",
    image:
      "https://images.unsplash.com/photo-1446717157973-03f219469f59?q=80&w=3538&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function RewiredMindFeatures() {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Create a ref to store the audio elements
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);

  const handlePlay = (index: number) => {
    if (audioRefs.current[index]) {
      audioRefs.current[index]?.play();
      setPlayingIndex(index);
      setIsPlaying(true);
    }
  };

  const handlePause = (index: number) => {
    if (audioRefs.current[index]) {
      audioRefs.current[index]?.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            Explore now
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Discover a new way to destress
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We’ve spent hundreds of hours curating scientifically proven stress
            management techniques so that you don’t have to.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-10 sm:max-w-none sm:grid-cols-2 lg:max-w-none lg:grid-cols-3">
          {audioFeatures.map((feature, index) => (
            <Card key={feature.name} className="relative overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${feature.image})` }}
              />
              <div className="absolute inset-0 bg-black opacity-40" />
              <CardHeader className="relative flex items-center justify-center h-60">
                {isPlaying && playingIndex === index ? (
                  <button
                    className="text-white bg-gray-900 bg-opacity-75 p-3 rounded-full hover:bg-opacity-50"
                    onClick={() => handlePause(index)}
                  >
                    <PauseIcon className="h-8 w-8" aria-hidden="true" />
                  </button>
                ) : (
                  <button
                    className="text-white bg-gray-900 bg-opacity-75 p-3 rounded-full hover:bg-opacity-50"
                    onClick={() => handlePlay(index)}
                  >
                    <PlayIcon className="h-8 w-8" aria-hidden="true" />
                  </button>
                )}
              </CardHeader>
              <CardContent className="relative text-center text-white">
                <h3 className="text-lg font-semibold">{feature.name}</h3>
                <p className="mt-2 text-base">{feature.description}</p>
              </CardContent>
              <audio
                ref={(el) => {
                  audioRefs.current[index] = el;
                }}
                src={feature.audioSrc}
              />
            </Card>
          ))}
          {textFeatures.map((feature) => (
            <Card key={feature.name} className="relative overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${feature.image})` }}
              />
              <div className="absolute inset-0 bg-black opacity-40" />
              <CardHeader className="relative flex items-center justify-center h-36"></CardHeader>
              <CardContent className="relative text-center text-white">
                <h3 className="text-lg font-semibold">{feature.name}</h3>
                <p className="mt-2 text-base">{feature.description}</p>
                <p className="mt-2 text-base">{feature.subText}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
