"use client";

import { useState, useEffect, useCallback } from "react";

import { toast } from "sonner";

import validateFiles from "@/utils/validate-files";

export default function useDragOver() {
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleDragOver = useCallback((event: globalThis.DragEvent) => {
    event.preventDefault();
    setIsDraggingOver(true);
  }, []);

  const handleDragEnter = useCallback((event: globalThis.DragEvent) => {
    event.preventDefault();
    setIsDraggingOver(true);
  }, []);

  const handleDragLeave = useCallback((event: globalThis.DragEvent) => {
    event.preventDefault();
    const target = event.relatedTarget;
    if (target === null || (target instanceof Node && !document.documentElement.contains(target))) {
      setIsDraggingOver(false);
    }
  }, []);

  const handleDrop = useCallback(
    async (event: globalThis.DragEvent) => {
      event.preventDefault();
      setIsDraggingOver(false);

      const files = event.dataTransfer?.files;

      if (files && files.length > 0) {
        await validateFiles(files);
      } else {
        toast.error("Inga filer valda");
      }
      event.dataTransfer?.clearData();
    },
    [validateFiles, setIsDraggingOver],
  );

  // --- Add and Remove Global Event Listeners ---
  useEffect(() => {
    window.addEventListener("dragenter", handleDragEnter);
    window.addEventListener("dragover", handleDragOver);
    window.addEventListener("dragleave", handleDragLeave);
    window.addEventListener("drop", handleDrop);

    return () => {
      window.removeEventListener("dragenter", handleDragEnter);
      window.removeEventListener("dragover", handleDragOver);
      window.removeEventListener("dragleave", handleDragLeave);
      window.removeEventListener("drop", handleDrop);
    };
  }, [handleDragEnter, handleDragOver, handleDragLeave, handleDrop]);
  return [isDraggingOver, setIsDraggingOver] as const;
}
