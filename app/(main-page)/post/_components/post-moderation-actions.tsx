import DeletePostButton from "@/components/delete-post-button";
import type { Post } from "@prisma/client";

interface PostModerationActionsProps {
  postData: Post;
  postUserRole: string;
}

export default function PostModerationActions({ postData }: PostModerationActionsProps) {
  return (
    <div className="flex justify-end gap-x-3 text-sm md:text-base">
      <DeletePostButton postData={postData} redirectPath="/" />
    </div>
  );
}
