"use server";

import { clerkClient } from "@clerk/nextjs/server";

interface CheckIfRoleIsCorrectProps {
  id: string;
}

export default async function checkIfRoleIsCorrect({
  id,
}: CheckIfRoleIsCorrectProps) {
  const client = await clerkClient();

  try {
    const user = await client.users.getUser(id);
    if (
      user.publicMetadata.role === "admin" ||
      user.publicMetadata.role === "moderator" ||
      user.publicMetadata.role === "medlem"
    ) {
      return true;
    } else {
      return false;
    }
  } catch {
    return { error: "Failed to change role" };
  }
}
