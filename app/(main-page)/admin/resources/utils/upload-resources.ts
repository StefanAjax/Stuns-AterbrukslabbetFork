"use server";

import fs from "node:fs";
import path from "node:path";

import { db } from "@/lib/db";
import type { ExtendedFile } from "@/types/globals";

export default async function uploadResources(files: ExtendedFile[]) {
  const uploadDir = path.join(process.cwd(), "client", "documents");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  // Create a new promise for each file upload
  const uploadPromises = files.map(async (file) => {
    return new Promise<{ message?: string; error?: string }>(async (resolve, reject) => {
      const filePath = path.join(uploadDir, file.name);

      // Check if the file already exists
      if (fs.existsSync(filePath)) {
        reject({
          error: `Filen ${file.name} finns redan. Vänligen döp om den eller ta bort den gamla filen.`,
        });
      }

      file.arrayBuffer().then((arrayBuffer) => {
        const buffer = Buffer.from(arrayBuffer);
        fs.writeFile(filePath, buffer, (err) => {
          if (err) {
            reject({ error: `Ett fel inträffade när filen ${file.name} skulle sparas: ${err.message}` });
            return;
          }
          // db.resources.create and resolve are now handled inside the fs.writeFile callback above.
        });
      });

      console.log("Code reached here after fs.writeFile");

      await db.resources.create({
        data: {
          name: file.name,
          url: `client/documents/${file.name}`,
          visible: file.visible,
          createdAt: new Date(),
        },
      });

      resolve({ message: `Filen ${file.name} har laddats upp.` });
    });
  });

  return Promise.all(uploadPromises);
}
