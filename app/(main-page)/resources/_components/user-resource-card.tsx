"use client";

import { Button } from "@/components/ui/button";

import type { ExtendedFile } from "@/types/globals";
interface UserResourceCardProps {
  resource: ExtendedFile;
}

export default function UserResourceCard({ resource }: UserResourceCardProps) {
  const downloadFile = async (file: ExtendedFile) => {
    window.location.href = `/api/download/${file.name}`;
  };

  return (
    <div className="flex w-full flex-col items-center justify-center rounded-lg bg-white p-4 shadow-md dark:bg-gray-800 dark:text-white md:w-1/2 lg:w-1/3 xl:w-1/4">
      <h2 className="text-xl font-bold">{resource.name}</h2>
      <Button className="mt-4 w-full rounded bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600" onClick={() => downloadFile(resource)}>
        Ladda ner
      </Button>
    </div>
  );
}
