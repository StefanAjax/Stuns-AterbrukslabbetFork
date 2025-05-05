"use client";

import { useCallback, useState, useEffect } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ResourceUploadForm() {
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const [files, setFiles] = useState<File[]>([]);

  const validateFiles = useCallback(
    async (files: FileList) => {
      const fileArray = Array.from(files);
      const validFiles: File[] = [];

      for (const file of fileArray) {
        if (file.size > 10 * 1024 * 1024) {
          toast.error(`Filen ${file.name} är för stor. Maximal storlek är 10 MB.`);
          continue;
        }

        if (!file.type.startsWith("application/pdf")) {
          toast.error(`Filen ${file.name} är inte en giltig PDF.`);
          continue;
        }

        validFiles.push(file);
      }

      if (validFiles.length === 1) {
        toast.success("1 fil har validerats och är redo att laddas upp.");
      } else if (validFiles.length > 1) {
        toast.success(`${validFiles.length} filer har validerats och är redo att laddas upp.`);
      } else {
        toast.error("Inga giltiga filer hittades.");
        return;
      }

      // TODO: Handle the upload of valid files
      // TODO: Ensure that the api endpoint for getting files does not give files with a visibility of false
      setFiles(validFiles);
    },
    [setIsDraggingOver],
  );

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

  return (
    <>
      {isDraggingOver && (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <p className="text-2xl font-bold text-white">Släpp filerna här för att ladda upp</p>
        </div>
      )}
      <Input
        className="hidden"
        id="file-upload"
        type="file"
        accept="application/pdf"
        onChange={(e) => {
          const files = e.target.files;
          if (files && files.length > 0) {
            validateFiles(files);
          } else {
            toast.error("Inga filer valda");
          }
        }}
      />
      <Button variant="outline" className="mt-4 w-full rounded-lg border-2 border-dashed" onClick={() => document.getElementById("file-upload")?.click()}>
        Välj PDF-filer
      </Button>
    </>
  );
}
