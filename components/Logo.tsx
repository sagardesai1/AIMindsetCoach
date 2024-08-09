import React from "react";
import { AspectRatio } from "./ui/aspect-ratio";
import Image from "next/image";
import TextIcon from "@/images/logo/TextIcon.png";

function Logo() {
  return (
    <div className="flex items-center w-60 h-5">
      <AspectRatio ratio={16 / 9} className="flex items-center justify-center">
        <Image
          priority
          src={TextIcon}
          alt="HackWellness"
          // className="dark:filter dark:invert"
        ></Image>
      </AspectRatio>
    </div>
  );
}

export default Logo;
