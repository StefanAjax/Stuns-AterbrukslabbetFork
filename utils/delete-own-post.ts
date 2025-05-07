"use server";

import { db } from "@/lib/db";
import type { Post } from "@prisma/client";
import path from "node:path";
import fs from "node:fs";

import archivePost from "./archive-post";

interface DeletePostProps {
  postData: Post;
  deletionReason: string;
}

export default async function deletePost({ postData, deletionReason }: DeletePostProps) {
  try {
    await archivePost({ postData, deletionReason });
  } catch (err) {
    return { error: "Kunde inte arkivera annons" };
  }

  try {
    const post = await db.post.findUnique({
      where: {
        id: postData.id,
      },
      select: {
        imageThumbUrl: true,
      },
    });

    if (post && post.imageThumbUrl) {
      const imagePath = path.join(process.cwd(), "public", post.imageThumbUrl);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await db.post.delete({
      where: {
        id: postData.id,
      },
    });
    return { data: "borttagen" };
  } catch {
    return { error: "Kunde inte ta bort annons" };
  }
}
