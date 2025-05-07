"use server";

import { db } from "@/lib/db";
import { getUserId } from "@/utils/get-user-id";
import fs from "node:fs";
import path from "node:path";
import makeRandomId from "@/utils/make-random-id";

interface EditPostProps {
  data: any;
  postId?: string;
}

export default async function createPost({ data, postId }: EditPostProps) {
  try {
    if (!postId) {
      return { error: "Ingen annons vald" };
    }

    const userId = await getUserId();

    if (!userId) {
      return { error: "Kunde inte hämta användarinformation" };
    }

    // Get userId from the post
    const postUser = await db.post.findUnique({
      where: {
        id: parseInt(postId),
      },
      select: {
        userId: true,
      },
    });

    if (!postUser) {
      return { error: "Kunde inte hämta användarinformation" };
    }

    if (postUser.userId !== userId) {
      return { error: "Du har inte behörighet att redigera denna annons" };
    }

    const image = data.image;

    let fullURL: string | null = null;
    let thumbURL: string | null = null;
    let imageName: string | null = null;

    if (image instanceof File) {
      // Get image as base64

      imageName = image.name;

      const fileName = makeRandomId({ length: 15 });

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

    // Get the thumbURL from the database and delete the file
    const post = await db.post.findUnique({
      where: {
        id: parseInt(postId),
      },
      select: {
        imageThumbUrl: true,
      },
    });

    if (post && post.imageThumbUrl) {
      const oldFilePath = path.join(process.cwd(), "public", post.imageThumbUrl);
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
    }

    await db.post.update({
      where: {
        id: parseInt(postId),
      },
      data: {
        title: data.title,
        description: data.description,
        postType: data.postTypePicker,
        category: data.categoryPicker,
        location: data.municipalityPicker,
        imageThumbUrl: thumbURL,
        imageFullUrl: fullURL,
        imageName: imageName,
        expiresAt: data.datePicker !== null ? new Date(data.datePicker) : undefined,
        hasCustomExpirationDate: data.datePicker !== null,
      },
    });

    return { data: "Annons " + data.title + " uppdaterad" };
  } catch {
    return { error: "Kunde inte uppdatera annonsen" };
  }
}
