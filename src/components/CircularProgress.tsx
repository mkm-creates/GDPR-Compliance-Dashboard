import React from "react";
import { cn } from "@/lib/utils";

interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
  className?: string;
}

export function CircularProgress({
  value,
  size = 180,
  strokeWidth = 6,
  label,
  sublabel,
  className,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className={cn("relative flex flex-col items-center justify-center", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#2D2D2D"
          strokeOpacity="0.1"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#4B5E40"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="square"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        {label && <span className="text-4xl font-mono text-bento-text font-bold">{label}</span>}
        {sublabel && <span className="text-[9px] text-bento-dark opacity-60 font-bold tracking-widest uppercase mt-1">{sublabel}</span>}
      </div>
    </div>
  );
}
