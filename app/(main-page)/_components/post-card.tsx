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
  const { postTypeColor, expirationDateText } = getPostTypeSpecificData({
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
      <div className="flex w-full rounded-xl bg-secondary py-2 pr-2 md:py-4 md:pr-4">
        <div className={cn("mr-1 min-w-1 rounded-e-md md:mr-2 md:min-w-2", postTypeColor)} />
        <div className="grid w-full grid-cols-12">
          <section className="col-span-4">
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
              alt="Annonsens bild"
              width={400}
              height={300}
              className="aspect-[4/3] w-full rounded-md"
            />
          </section>
          <section className="col-span-5 flex flex-col pl-2 md:pl-4">
            <div className="grow">
              <h3 className="line-clamp-1 break-all text-sm md:text-2xl">{postData.title}</h3>
              <p className="mt-1 line-clamp-2 break-words text-[10px] md:line-clamp-3 md:text-base">{postData.description}</p>
            </div>
            <div className="pt-1 md:pt-0">
              <div className="flex items-center gap-1">
                <div className={cn("h-2 w-2 rounded-[50%] md:h-3 md:w-3", postTypeColor)}></div>
                <p className="text-[9px] md:text-sm">{postData.postType}</p>
              </div>
              <p className="line-clamp-1 break-all text-[8px] capitalize md:text-sm">{postData.location}</p>
            </div>
          </section>
          <section className="col-span-3 flex flex-col-reverse pl-2 md:flex-col">
            <div className="flex flex-col-reverse md:grow md:flex-col">
              <p className="pt-1 text-end text-[9px] md:pb-2 md:text-base">{creationDateString}</p>
              {postData.hasCustomExpirationDate && (
                <div className="text-end text-[9px] text-red-500 md:text-base">
                  <p>{expirationDateText}</p>
                  <p>{expirationDateString}</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </Link>
  );
}
