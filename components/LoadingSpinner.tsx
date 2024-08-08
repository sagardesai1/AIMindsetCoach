"use client";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import React from "react";

export default function LoadingSpinner() {
  return (
    <AspectRatio ratio={16 / 9}>
      <iframe
        className="absolute top-0 left-0 w-full h-full rounded-lg"
        src={
          "https://lottie.host/embed/9b23c85e-d2c6-4392-a993-5018082d76d6/qaVUpkCmES.json"
        }
        title={"loading state"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </AspectRatio>
  );
}
