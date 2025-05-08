"use server";

import fs from "node:fs";
import path from "node:path";

import { db } from "@/lib/db";
import type { ExtendedFile } from "@/types/globals";

interface UploadResponse {
  message?: string;
  error?: string;
}

export default async function uploadResources(files: ExtendedFile[]): Promise<UploadResponse[]> {
  console.log(files.map((file) => file.visible));
  try {
    const uploadDir = path.join(process.cwd(), "client", "documents");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const messages = files.map(async (file) => {
      try {
        const filePath = path.join(uploadDir, file.name);
        if (fs.existsSync(filePath)) {
          return {
            error: `Filen ${file.name} finns redan.`,
          };
        }

        if (!file.file) {
          return {
            error: `Filen ${file.name} har ingen giltig fil.`,
          };
        }
        const buffer = Buffer.from(await file.file.arrayBuffer());
        fs.writeFileSync(filePath, buffer);

        console.log(file.visible);

        await db.resources.create({
          data: {
            name: file.name,
            url: `client/documents/${file.name}`,
            visible: file.visible,
            createdAt: new Date(),
          },
        });

        return {
          message: `Filen ${file.name} har laddats upp.`,
        };
      } catch (error) {
        console.error("Error uploading file:", error);
        return {
          error: `Ett fel inträffade vid uppladdning av filen ${file.name}.`,
        };
      }
    });

    return await Promise.all(messages);
  } catch (error) {
    return [
      {
        error: "Ett fel inträffade vid uppladdning av filer.",
      },
    ];
  }
}
