"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import type { Post } from "@prisma/client";

import creationDateToString from "../utils/creation-date-to-string";
import getPostTypeSpecificData from "../utils/get-post-type-specific-data";

interface PostCardProps {
  postData: Post;
  timezone: string;
}

export default function PostCard({ postData, timezone }: PostCardProps) {
  const [creationDateString, setCreationDateString] = useState("laddar...");
  const [expirationDateString, setExpirationDateString] = useState("laddar...");
  const { postTypeColor } = getPostTypeSpecificData({
    postType: postData.postType,
  });

  // UseEffect is used here to prevent hydration errors caused by differing times on server and client
  useEffect(() => {
    const dateCreationString = creationDateToString(postData.createdAt, timezone);
    setCreationDateString(dateCreationString);
    setExpirationDateString(postData.expiresAt.toLocaleDateString("sv-SE"));
  }, [postData.createdAt, postData.expiresAt, timezone]);

  return (
    <Link href={`/post/${postData.id}`}>
      <article className="flex w-full rounded-xl border border-border bg-card py-2 pr-2 md:py-4 md:pr-4">
        <div className={cn("mr-2 w-1 rounded-r-md md:mr-3 md:w-2", postTypeColor)} aria-hidden="true" />
        <div className="flex w-full flex-1 gap-3">
          <figure className="w-1/3">
            <Image
              src={
                postData.category === "inventarie"
                  ? "/images/inventory.webp"
                  : postData.category === "förbrukningsvara"
                    ? "/images/consumables.webp"
                    : postData.category === "instrument/maskin"
                      ? "/images/instrument.webp"
                      : "/images/image-missing.webp"
              }
              alt={`Bild för ${postData.title}`}
              width={400}
              height={300}
              className="aspect-[4/3] rounded-lg"
            />
          </figure>

          <div className="flex flex-1 flex-col space-y-1 md:space-y-2">
            <div className="flex-1 space-y-1 md:space-y-2">
              <header>
                <h3 className="line-clamp-1 font-medium md:text-2xl">{postData.title}</h3>
              </header>
              <p className="line-clamp-2 text-sm md:line-clamp-3 md:text-base">{postData.description}</p>
            </div>

            <footer className="flex justify-between">
              <div>
                <div className="flex items-center gap-1">
                  <span className={cn("h-2 w-2 rounded-full md:h-3 md:w-3", postTypeColor)} aria-hidden="true" />
                  <p className="text-xs md:text-sm">{postData.postType}</p>
                </div>
                <address className="line-clamp-1 text-xs capitalize not-italic md:text-sm">{postData.location}</address>
              </div>

              <aside className={cn("text-right font-mono text-xs md:text-sm", !postData.hasCustomExpirationDate && "self-end")}>
                {postData.hasCustomExpirationDate ? (
                  <>
                    <time dateTime={postData.createdAt.toISOString()}>{creationDateString}</time>
                    <div className="text-warning">
                      <time dateTime={postData.expiresAt.toISOString()}>{expirationDateString}</time>
                    </div>
                  </>
                ) : (
                  <time dateTime={postData.createdAt.toISOString()}>{creationDateString}</time>
                )}
              </aside>
            </footer>
          </div>
        </div>
      </article>
    </Link>
  );
}
