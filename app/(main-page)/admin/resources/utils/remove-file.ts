"use server";

import path from "node:path";
import fs from "node:fs";

import { db } from "@/lib/db";

import { checkRole } from "@/utils/check-role";
import type { ExtendedFile, StandardResponse } from "@/types/globals";

export default async function removeFile(file: ExtendedFile): StandardResponse {
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
    await db.resources.delete({
      where: {
        id: file.id,
      },
    });

    const filePath = path.join(process.cwd(), "client", "documents", file.name);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return {
      success: {
        code: 200,
        message: "Resursen har tagits bort",
      },
    };
  } catch (error) {
    console.error("Error deleting file:", error);
    return {
      error: {
        code: 500,
        message: "Något gick fel",
      },
    };
  }
}
