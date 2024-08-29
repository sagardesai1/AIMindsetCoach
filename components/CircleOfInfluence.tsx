import React from "react";
import { Textarea } from "@/components/ui/textarea";

const calculatePadding = (width: number) => {
  return Math.sqrt(2) * (width / 2) - width / 2;
};

const CircleWithTextarea: React.FC<{ size: number; label: string }> = ({
  size,
  label,
}) => (
  <Textarea
    className="rounded-full border border-indigo-500 resize-none text-center box-border"
    placeholder={label}
    style={{
      width: size * 0.8,
      height: size * 0.8,
      padding: calculatePadding(size * 0.8),
    }}
  />
);

const ConcentricCirclesWithTextareas: React.FC = () => {
  const outerSize = 300;
  const middleSize = 200;
  const innerSize = 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 h-screen">
      {/* Left Side: Concentric Circles with Text Labels */}
      <div className="relative">
        {/* Outer Circle (Circle of Concern) */}
        <div
          className="absolute rounded-full bg-indigo-500 flex justify-center"
          style={{ width: outerSize, height: outerSize, bottom: 0 }}
        >
          <div className="mt-4">
            <div className="text-center text-white">Circle of</div>
            <div className="text-center text-white font-semibold">Concern</div>
          </div>
        </div>

        {/* Middle Circle (Circle of Influence) */}
        <div
          className="absolute rounded-full bg-indigo-300 flex justify-center"
          style={{
            width: middleSize,
            height: middleSize,
            bottom: 0,
            left: (outerSize - middleSize) / 2,
          }}
        >
          <div className="mt-4">
            <div className="text-center text-white">Circle of</div>
            <div className="text-center text-white font-semibold">
              Influence
            </div>
          </div>
        </div>

        {/* Inner Circle (Circle of Control) */}
        <div
          className="absolute rounded-full bg-indigo-200 flex justify-center"
          style={{
            width: innerSize,
            height: innerSize,
            bottom: 0,
            left: (outerSize - innerSize) / 2,
          }}
        >
          <div className="mt-4">
            <div className="text-center text-indigo-500">Circle of</div>
            <div className="text-center text-indigo-500 font-semibold">
              Control
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Circles with Textareas */}
      <div className="flex flex-col space-y-8 items-center">
        <CircleWithTextarea size={450} label="What can't you control..." />
        <CircleWithTextarea size={350} label="What you can influence..." />
        <CircleWithTextarea size={250} label="What can you control..." />
      </div>
    </div>
  );
};

export default ConcentricCirclesWithTextareas;
