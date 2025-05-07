"use server";

import { db } from "@/lib/db";

import { checkRole } from "@/utils/check-role";
import type { Resources } from "@prisma/client";
import type { ExtendedFile } from "@/types/globals";

export default async function handleFileVisibilityToggle(file: Resources | ExtendedFile) {
  const isAdmin = await checkRole("admin");
  const isModerator = await checkRole("moderator");

  if (!isAdmin && !isModerator) {
    throw new Error("Nekad åtkomst");
  }

  if (!("id" in file) || !file.id) {
    throw new Error("Ett fel inträffade");
  }

  try {
    await db.resources.update({
      where: {
        id: file.id,
      },
      data: {
        visible: file.visible,
      },
    });
  } catch (error) {
    console.error("Error updating file visibility:", error);
    throw new Error("Ett fel inträffade");
  }
}
