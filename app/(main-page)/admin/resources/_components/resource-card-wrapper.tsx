"use client";

import type { Resources } from "@prisma/client";
import type { ExtendedFile } from "@/types/globals";

import ResourceCard from "./resource-card";

interface ResourceCardWrapperProps {
  resources: Resources[];
}

export default function ResourceCardWrapper({ resources }: ResourceCardWrapperProps) {
  const removeFile = async (file: Resources | ExtendedFile) => {
    throw new Error("Not implemented");
  };

  const handleFileVisibilityToggle = async (file: Resources | ExtendedFile) => {
    throw new Error("Not implemented");
  };

  const downloadFile = async (file: Resources) => {
    // TODO: get clerk userID and pass it to the API route

    // Call the API route to download the file
    const response = await fetch(`/api/download/${file.name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <div className="align-center flex w-full justify-center p-4">
      <div className="flex w-2/3 flex-col gap-4 rounded-lg">
        <h2 className="text-2xl font-bold">Existerande resurser</h2>
        {resources.map((resource: Resources) => (
          <ResourceCard key={resource.id} index={resource.id} resource={resource} removeFile={removeFile} handleFileVisibilityToggle={handleFileVisibilityToggle} downloadFile={downloadFile} />
        ))}
      </div>
    </div>
  );
}
