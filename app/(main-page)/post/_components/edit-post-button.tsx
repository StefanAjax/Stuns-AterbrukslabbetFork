import Link from "next/link";
import { Button } from "@/components/ui/button";

import type { Post } from "@prisma/client";

interface EditPostProps {
  postData: Post;
}

export default function EditPostButton({ postData }: EditPostProps) {
  return (
    <Link href={`/post/edit/${postData.id}`}>
      <Button variant={"secondary"}>Redigera</Button>
    </Link>
  );
}
