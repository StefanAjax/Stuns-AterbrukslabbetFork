"use server";

import { checkRole } from "@/utils/check-role";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";

import type { Resources } from "@prisma/client";

import ResourceUploadForm from "./_components/resource-upload-form";
import ResourceCard from "./_components/resource-card";

export default async function Page() {
  if (!(await checkRole("admin")) && !(await checkRole("moderator"))) {
    redirect("/");
  }

  const resources = await db.resources.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      <ResourceUploadForm />
      <div className="flex flex-col gap-4">
        {resources.map((resource: Resources) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </>
  );
}
