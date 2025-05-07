"use client";

import type { Post } from "@prisma/client";

import PostCard from "./post-card";

interface PostContainerProps {
  posts?: Post[];
}

export default function PostContainer({ posts }: PostContainerProps) {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return (
    <div className="mt-6 flex flex-col gap-y-4 md:mt-8 md:gap-y-5">
      {posts && posts.length > 0 ? (
        posts.map((post) => {
          return <PostCard key={post.id} postData={post} timezone={timezone} />;
        })
      ) : (
        <div className="mt-8 flex justify-center md:mt-12">
          <p className="text-md w-3/5 rounded-lg bg-secondary py-3 text-center md:w-1/3 md:p-4 md:text-xl">Inga annonser hittades</p>
        </div>
      )}
    </div>
  );
}
