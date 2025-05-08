"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";

import handleFileVisibilityToggle from "../utils/handle-file-visibility-toggle";
import removeFile from "../utils/remove-file";
import ResourceCard from "./resource-card";
import { ExtendedFile } from "@/types/globals";

interface ResourceCardWrapperProps {
  resources: ExtendedFile[];
}

export default function ResourceCardWrapper({ resources }: ResourceCardWrapperProps) {
  const router = useRouter();

  const downloadFile = async (file: ExtendedFile) => {
    window.location.href = `/api/download/${file.name}`;
  };

  return (
    <div className="align-center flex w-full justify-center p-4">
      <div className="flex w-2/3 flex-col gap-4 rounded-lg">
        <h2 className="text-2xl font-bold">Existerande resurser</h2>
        {resources.map((resource: ExtendedFile) => (
          <ResourceCard
            key={resource.id}
            index={resource.id || 0}
            resource={resource}
            removeFile={async (resource) => {
              const promise = removeFile(resource);
              toast.promise(promise, {
                loading: "Tar bort filen...",
                success: "Filen borttagen",
                error: "Något gick fel",
              });
              router.push("/admin/resources");
              return await promise;
            }}
            handleFileVisibilityToggle={async (file) => {
              const promise = handleFileVisibilityToggle(file);
              toast.promise(promise, {
                loading: "Ändrar synlighet...",
                success: "Synlighet ändrad",
                error: "Något gick fel",
              });
              return await promise;
            }}
            downloadFile={downloadFile}
          />
        ))}
      </div>
    </div>
  );
}
