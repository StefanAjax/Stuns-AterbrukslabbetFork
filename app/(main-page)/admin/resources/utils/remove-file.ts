"use server";

import path from "node:path";
import fs from "node:fs";

import { db } from "@/lib/db";

import { checkRole } from "@/utils/check-role";
import type { ExtendedFile } from "@/types/globals";

export default async function removeFile(file: ExtendedFile) {
  const isAdmin = await checkRole("admin");
  const isModerator = await checkRole("moderator");

  if (!isAdmin && !isModerator) {
    throw new Error("Nekad åtkomst");
  }

  try {
    await db.resources.delete({
      where: {
        id: file.id,
      },
    });

    const filePath = path.join(process.cwd(), "client", "documents", file.name);

    console.log("File path:", filePath);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    console.error("Error deleting file:", error);
    throw new Error("Ett fel inträffade");
  }
}
