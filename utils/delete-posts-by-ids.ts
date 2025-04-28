import { db } from "@/lib/db";
import path from "node:path";
import fs from "node:fs";

import archivePost from "./archive-post";

interface DeletePostsByIdProps {
  postsIds: number[];
  deletionReason: string;
}

export default async function deletePostsByIds({ postsIds, deletionReason }: DeletePostsByIdProps) {
  try {
    const [posts] = await db.$transaction([
      db.post.findMany({
        where: {
          id: {
            in: postsIds,
          },
        },
      }),

      db.post.deleteMany({
        where: {
          id: {
            in: postsIds,
          },
        },
      }),
    ]);

    posts
      .filter((post) => post.imageThumbUrl)
      .map((post) => post.imageThumbUrl)
      .forEach((imageUrl) => {
        if (!imageUrl) return;
        const imagePath = path.join(process.cwd(), "public", imageUrl);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      });

    posts.forEach(async (post) => {
      await archivePost({ postData: post, deletionReason });
    });
  } catch {
    return { error: "Failed to archive user's posts" };
  }
}
