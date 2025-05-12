"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import type { Post } from "@prisma/client";

import creationDateToString from "../utils/creation-date-to-string";
import getPostTypeSpecificData from "../utils/get-post-type-specific-data";
import { Clock, MapPin, Tag, CalendarClock } from "lucide-react";

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
      <article className="flex w-full rounded-xl border border-border bg-card py-3 pr-4 md:py-4">
        <div className={cn("mr-2 w-1 rounded-r-md md:mr-3 md:w-2", postTypeColor)} aria-hidden="true" />

        {/* Responsive container that switches between row and column layout */}
        <div className="flex w-full flex-1 gap-3 max-[450px]:flex-col max-[450px]:gap-2">
          {/* Image section - full width on small screens, 1/3 width on larger screens */}
          <figure className="w-1/3 max-[450px]:mb-2 max-[450px]:w-full">
            <Image
              src={
                postData.imageThumbUrl
                  ? postData.imageThumbUrl
                  : postData.category === "inventarie"
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
              className="aspect-[4/3] rounded-lg object-cover object-center"
            />
          </figure>

          {/* Content section */}
          <div className="flex flex-1 flex-col space-y-1 md:space-y-2">
            <div className="flex-1 space-y-1 md:space-y-2">
              <header>
                <h3 className="line-clamp-1 text-base font-medium max-[450px]:text-lg md:text-2xl">{postData.title}</h3>
              </header>
              <p className="line-clamp-2 text-sm md:line-clamp-3 md:text-base">{postData.description}</p>
            </div>

            {/* Post metadata footer - reorganized for better small screen layout */}
            <footer className="flex flex-wrap justify-between gap-y-1 pt-1">
              <div>
                <div className="flex items-center gap-1">
                  <Tag size={12} className="md:h-3 md:w-3" />
                  <p className="text-xs md:text-sm">{postData.postType}</p>
                </div>
                <address className="flex items-center gap-1 text-xs capitalize not-italic md:text-sm">
                  <MapPin size={12} className="md:h-3 md:w-3" />
                  {postData.location}
                </address>
              </div>

              <aside className={cn("text-right font-mono text-xs md:text-sm", !postData.hasCustomExpirationDate && "self-end")}>
                {postData.hasCustomExpirationDate ? (
                  <>
                    <div className="flex items-center justify-end gap-1">
                      <Clock size={12} className="md:h-3 md:w-3" />
                      <time dateTime={postData.createdAt.toISOString()}>{creationDateString}</time>
                    </div>
                    <div className="flex items-center justify-end gap-1 text-warning">
                      <CalendarClock size={12} className="md:h-3 md:w-3" />
                      <time dateTime={postData.expiresAt.toISOString()}>{expirationDateString}</time>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-end gap-1">
                    <Clock size={12} className="md:h-3 md:w-3" />
                    <time dateTime={postData.createdAt.toISOString()}>{creationDateString}</time>
                  </div>
                )}
              </aside>
            </footer>
          </div>
        </div>
      </article>
    </Link>
  );
}
