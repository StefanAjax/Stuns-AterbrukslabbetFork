"use client";

import type { Resources } from "@prisma/client";
import { Button } from "@/components/ui/button";

interface ResourceCardProps {
  resource: Resources;
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <>
      {/* Card for viewing, deleting, and toggling visibility of resource (Swedish)*/}
      <div className="flex flex-col gap-2 rounded-lg border bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800">
        <h3 className="text-lg font-semibold">{resource.name}</h3>
        <div className="mt-2 flex items-center justify-between">
          <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            Visa resurs
          </a>
          <Button variant={"destructive"} className="rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">
            Ta bort
          </Button>
        </div>
        <div className="mt-2 flex items-center">
          <input type="checkbox" id={`visibility-${resource.id}`} className="mr-2" defaultChecked={resource.visible} />
          <label htmlFor={`visibility-${resource.id}`} className="text-sm text-gray-500">
            Synlig för alla
          </label>
        </div>
      </div>
    </>
  );
}
