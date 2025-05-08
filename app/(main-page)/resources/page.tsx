"use server";

import { db } from "@/lib/db";

import UserResourceCard from "./_components/user-resource-card";

export default async function Page() {
  const resources = await db.resources.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      visible: true,
    },
  });

  return (
    <>
      {resources.length > 0 && (
        <div className="flex w-full justify-center p-4">
          {resources.map((resource) => {
            return <UserResourceCard key={resource.id} resource={resource} />;
          })}
        </div>
      )}
      {resources.length === 0 && (
        <div className="flex w-full justify-center p-4">
          <h2 className="text-2xl font-bold">Inga resurser tillgängliga</h2>
        </div>
      )}
    </>
  );
}
