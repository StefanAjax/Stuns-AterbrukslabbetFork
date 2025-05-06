"use server";

import { checkRole } from "@/utils/check-role";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";

import ResourceUploadForm from "./_components/resource-upload-form";
import ResourceCardWrapper from "./_components/resource-card-wrapper";

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
      <ResourceCardWrapper resources={resources} />
    </>
  );
}
