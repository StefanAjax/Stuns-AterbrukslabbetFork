"use client";

import { cn } from "@/lib/utils";

interface UnviewedReportsIndicatorProps {
  hasUnviewedReports: boolean;
  className?: string;
}

export default function UnviewedReportsIndicator({ hasUnviewedReports, className }: UnviewedReportsIndicatorProps) {
  // Don't show the indicator if there are no unviewed reports
  if (!hasUnviewedReports) return null;

  return (
    <span className={cn("relative flex", className)}>
      {/* Outer animated ping circle */}
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75"></span>
      {/* Inner solid circle */}
      <span className="relative inline-flex h-full w-full rounded-full bg-destructive"></span>
    </span>
  );
}
