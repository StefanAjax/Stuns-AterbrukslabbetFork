"use server";

import { db } from "@/lib/db";

import { checkRole } from "@/utils/check-role";
import type { ExtendedFile, StandardResponse } from "@/types/globals";

export default async function handleFileVisibilityToggle(file: ExtendedFile): StandardResponse {
  const isAdmin = await checkRole("admin");
  const isModerator = await checkRole("moderator");

  if (!isAdmin && !isModerator) {
    return {
      error: {
        code: 403,
        message: "Nekad åtkomst",
      },
    };
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
    return {
      success: {
        code: 200,
        message: "Resursens synlighet har ändrats",
      },
    };
  } catch (error) {
    console.error("Error updating file visibility:", error);
    return {
      error: {
        code: 500,
        message: "Något gick fel",
      },
    };
  }
}
