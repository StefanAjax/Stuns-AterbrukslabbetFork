"use server";

import { db } from "@/lib/db";
import { getUserId } from "@/utils/get-user-id";

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

    console.log(postId);
    console.log(typeof postId);

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
        expiresAt: data.datePicker !== undefined ? new Date(data.datePicker) : undefined,
        hasCustomExpirationDate: data.datePicker !== undefined,
      },
    });
    return { data: "Annons " + data.title + " uppdaterad" };
  } catch {
    return { error: "Kunde inte uppdatera annonsen" };
  }
}
