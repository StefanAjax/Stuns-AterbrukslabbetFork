"use client";

import { useCallback, useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import uploadResources from "../utils/upload-resources";

import ResourceCard from "./resource-card";
import type { ExtendedFile } from "@/types/globals";

export default function ResourceUploadForm() {
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const [files, setFiles] = useState<ExtendedFile[]>([]);

  const router = useRouter();

  const validateFiles = useCallback(
    async (filesInput: FileList) => {
      const fileArray = Array.from(filesInput);
      const newFiles: ExtendedFile[] = [];

      for (const file of fileArray) {
        if (file.size > 10 * 1024 * 1024) {
          toast.error(`Filen ${file.name} är för stor. Maximal storlek är 10 MB.`);
          continue;
        }

        if (!file.type.startsWith("application/pdf")) {
          toast.error(`Filen ${file.name} är inte en giltig PDF.`);
          continue;
        }

        if (files.some((existingFile) => existingFile.name === file.name)) {
          toast.error(`Filen ${file.name} finns redan i listan.`);
          continue;
        }

        newFiles.push({
          file,
          name: file.name,
          visible: true,
        });
      }

      if (newFiles.length === 1) {
        toast.success("1 fil har validerats och är redo att laddas upp.");
      } else if (newFiles.length > 1) {
        toast.success(`${newFiles.length} filer har validerats och är redo att laddas upp.`);
      } else {
        toast.error("Inga giltiga filer hittades.");
        return;
      }

      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    },
    [files, setFiles],
  );

  const uploadFiles = async () => {
    const responses = await uploadResources(files);

    responses.forEach((response) => {
      if (response.error) {
        toast.error(response.error);
      } else if (response.message) {
        toast.success(response.message);
        setFiles([]);
        router.push("/admin/resources");
      }
    });
  };

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

  const handleRemoveFile = async (file: ExtendedFile) => {
    setFiles((prevFiles) => prevFiles.filter((f) => f.name !== file.name));
    toast.success("Filen har tagits bort från uppladdningen.");
  };

  const handleFileVisibilityToggle = async (file: ExtendedFile) => {
    setFiles((prevFiles) =>
      prevFiles.map((f) => {
        if (f.name === file.name) {
          f.visible = file.visible;
          return f;
        }
        return f;
      }),
    );
    toast.success(`Filen ${file.name} ${file.visible ? "visas" : "döljs"}.`);
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 p-4">
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
        multiple
        onChange={(e) => {
          const files = e.target.files;
          if (files && files.length > 0) {
            validateFiles(files);
          } else {
            toast.error("Inga filer valda");
          }
        }}
      />
      <Button
        variant="outline"
        className="mt-2 flex h-full min-h-[8rem] w-2/3 flex-col items-center justify-center rounded-sm border-2 border-dashed bg-primary px-2 py-1 text-center text-sm md:text-base"
        onClick={() => document.getElementById("file-upload")?.click()}
      >
        Välj PDF-filer
      </Button>
      {files.length > 0 && (
        <>
          <div className="mt-4 flex w-2/3 flex-col gap-2">
            <h2 className="text-2xl font-bold">Nya resurser</h2>
            {files.map((file, index) => (
              <ResourceCard key={index} index={index} resource={file} removeFile={handleRemoveFile} handleFileVisibilityToggle={handleFileVisibilityToggle} />
            ))}
          </div>
          <Button className="mt-4 w-2/3 self-center bg-primary" onClick={uploadFiles}>
            Ladda upp filer
          </Button>
        </>
      )}
    </div>
  );
}
