"use server";

import { db } from "@/lib/db";
import { getUserId } from "@/utils/get-user-id";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

interface CreatePostProps {
  data: any;
}

export default async function createPost({ data }: CreatePostProps) {
  try {
    const userId = await getUserId();

    if (!userId) {
      return { error: "Kunde inte hämta användarinformation" };
    }

    const image = data.image;

    let fullURL: string | null = null;
    let thumbURL: string | null = null;
    let imageName: string | null = null;

    if (image instanceof File) {
      // Get image as base64

      imageName = image.name;

      const buffer = Buffer.from(await image.arrayBuffer());
      const base64Image = buffer.toString("base64");

      // Create a unique file name by hashing the base64 string

      const filename = crypto.createHash("sha256").update(base64Image).digest("hex");

      // Return an error if the file name already exists
      if (fs.existsSync(path.join(process.cwd(), "public", "uploads", filename))) {
        return {
          error: "Kunde inte skapa annonsen",
        };
      }

      // Define the path to the uploads directory

      const uploadsDir = path.join(process.cwd(), "public", "uploads");

      // Create the uploads directory if it doesn't exist
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      // Define the path to the file

      const filePath = path.join(uploadsDir, filename);

      // Read the file data
      const fileData = new Uint8Array(await image.arrayBuffer());
      // Write the file to the uploads directory
      fs.writeFileSync(filePath, fileData);
      // Construct the URL to access the file

      thumbURL = `/uploads/${filename}`;

      fullURL = `${process.env.NEXT_PUBLIC_SITE_URL}${thumbURL}`;
    }

    await db.post.create({
      data: {
        userId: userId,
        title: data.title,
        description: data.description,
        postType: data.postTypePicker,
        category: data.categoryPicker,
        location: data.municipalityPicker,
        imageFullUrl: fullURL,
        imageThumbUrl: thumbURL,
        imageName: imageName,
        expiresAt: data.datePicker !== null ? new Date(data.datePicker) : undefined,
        hasCustomExpirationDate: data.datePicker !== null,
      },
    });
    return { data: "Annons " + data.title + " skapat" };
  } catch (error) {
    console.error("Error creating post:", error);
    return { error: "Kunde inte skapa annonsen" };
  }
}
