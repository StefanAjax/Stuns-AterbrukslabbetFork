"use client";

import type { Resources } from "@prisma/client";
import { Button } from "@/components/ui/button";
import type { ExtendedFile } from "@/types/globals";

interface ResourceCardProps {
  resource: Resources | ExtendedFile;
  index: number;
  removeFile: (file: ExtendedFile | Resources) => void;
  handleFileVisibilityToggle: (file: ExtendedFile | Resources) => void;
  downloadFile?: (file: Resources) => void;
}

export default function ResourceCard({ resource, index, removeFile, handleFileVisibilityToggle, downloadFile }: ResourceCardProps) {
  return (
    <>
      <div className="flex w-full flex-col gap-2 rounded-lg border bg-white p-4 shadow-md">
        <h3 className="text-lg font-semibold">{resource.name}</h3>
        {"url" in resource && typeof resource.url === "string" && downloadFile && (
          <Button className="w-24 rounded bg-blue-400 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500" onClick={() => downloadFile(resource as Resources)}>
            Ladda ned
          </Button>
        )}
        <Button
          variant={"destructive"}
          className="w-24 rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          onClick={() => {
            removeFile(resource);
          }}
        >
          Ta bort
        </Button>
        <div className="mt-2 flex items-center">
          <input
            id={`visibility-${index}`}
            type="checkbox"
            className="mr-2"
            defaultChecked={resource.visible}
            onChange={() => {
              const isChecked = !resource.visible;
              resource.visible = isChecked;
              handleFileVisibilityToggle(resource);
            }}
          />
          <label htmlFor={`visibility-${index}`} className="text-sm text-gray-500">
            Synlig för alla
          </label>
        </div>
      </div>
    </>
  );
}
