"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Page() {
  const [isDraggingOver, setIsDraggingOver] = useState(false);

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
    },
    [setIsDraggingOver],
  );

  // Two sections. One for uploading new resources and one for managing existing resources.
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
          <p className="text-2xl font-bold text-white">Släpp filen här för att ladda upp</p>
        </div>
      )}
      <div className="mx-auto mt-10 max-w-screen-md p-4">
        <h1 className="mb-6 text-center text-2xl font-semibold">Resurser</h1>
        <p className="mb-4 text-center text-lg font-medium">Här kan du ladda upp och hantera resurser för användare.</p>
      </div>
      <div className="mx-auto mt-10 max-w-screen-md p-4">
        <h2 className="mb-4 text-xl font-semibold">Ladda upp nya resurser</h2>
        <p className="mb-4 text-lg font-medium">Dra och släpp PDF-filer här eller klicka för att välja filer.</p>
        <Input
          id="file-upload"
          className="hidden"
          type="file"
          accept="application/pdf"
          multiple
          onChange={(e) => {
            if (e.target.files) {
              validateFiles(e.target.files);
            }
          }}
        />
        <p className="mt-2 text-sm text-gray-500">Maximal filstorlek: 10 MB. Endast PDF-filer är tillåtna.</p>
        <Button
          className={`mt-4 h-32 rounded-lg border-2 border-dashed ${isDraggingOver ? "border-blue-500" : "border-gray-300"} flex items-center justify-center`}
          onClick={() => {
            const fileInput = document.getElementById("file-upload") as HTMLInputElement;
            if (fileInput) {
              fileInput.click();
            }
          }}
        >
          <p className="text-lg font-medium text-gray-500">Dra och släpp filer här</p>
        </Button>
        <p className="mt-2 text-sm text-gray-500">Eller klicka för att välja filer.</p>
      </div>
    </>
  );
}
