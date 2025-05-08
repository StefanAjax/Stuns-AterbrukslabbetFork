"use server";

import { db } from "@/lib/db";
import { getUserId } from "@/utils/get-user-id";
import fs from "node:fs";
import path from "node:path";
import makeRandomId from "@/utils/make-random-id";

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

      // Get file extension

      const fileExtension = imageName.split(".").pop();

      const fileName = `${makeRandomId({ length: 15 })}.${fileExtension}`;

      // Return an error if the file name already exists
      if (fs.existsSync(path.join(process.cwd(), "client", "images", fileName))) {
        return {
          error: "Kunde inte skapa annonsen",
        };
      }

      const imagesDir = path.join(process.cwd(), "client", "images");

      if (!fs.existsSync(imagesDir)) {
        fs.mkdirSync(imagesDir, { recursive: true });
      }
      // Define the path to the file

      const filePath = path.join(imagesDir, fileName);

      // Read the file data
      const fileData = new Uint8Array(await image.arrayBuffer());
      fs.writeFileSync(filePath, fileData);
      // Construct the URL to access the file

      thumbURL = `/api/images?filePath=${fileName}`;

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
