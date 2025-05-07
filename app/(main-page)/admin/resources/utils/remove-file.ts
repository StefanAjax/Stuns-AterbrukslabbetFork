"use server";

import path from "node:path";
import fs from "node:fs";

import { db } from "@/lib/db";

import { checkRole } from "@/utils/check-role";
import type { Resources } from "@prisma/client";
import type { ExtendedFile } from "@/types/globals";

export default async function removeFile(file: Resources | ExtendedFile) {
  const isAdmin = await checkRole("admin");
  const isModerator = await checkRole("moderator");

  if (!isAdmin && !isModerator) {
    throw new Error("Nekad åtkomst");
  }

  if (!("id" in file) || !file.id) {
    throw new Error("Ett fel inträffade");
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
  } catch (error) {
    console.error("Error deleting file:", error);
    throw new Error("Ett fel inträffade");
  }
}
