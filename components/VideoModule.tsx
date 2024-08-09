"use client";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

function VideoModule() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="absolute items-center flex flex-row bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-white rounded-full font-medium group p-2 lg:p-4 shadow-lg">
          <svg
            className="w-5 h-5 lg:w-6 lg:h-6 fill-current text-gray-400 group-hover:text-blue-600 shrink-0"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0 2C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12z" />
            <path d="M10 17l6-5-6-5z" />
          </svg>
          <span className="ml-3 text-xs lg:text-lg">
            Watch the full video (2 min)
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1200px]">
        <video
          width="1920"
          height="1080"
          loop
          playsInline
          controls
          autoPlay
          className="w-full h-full object-cover"
        >
          <source src="/hero-demo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </DialogContent>
    </Dialog>
  );
}

export default VideoModule;
