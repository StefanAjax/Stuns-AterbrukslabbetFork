import Link from "next/link";

import type { Post } from "@prisma/client";

interface EditPostProps {
  postData: Post;
}

export default function EditPostButton({ postData }: EditPostProps) {
  return (
    <Link className="text-sm font-semibold text-destructive hover:opacity-80 md:text-base" href={`/post/edit/${postData.id}`}>
      Redigera annons
    </Link>
  );
}
