"use client";

import { Clock, MapPin, User, Tag, CalendarClock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { JSX, useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import type { Post } from "@prisma/client";

import ContactMeDialog from "./contact-me-dialog";
import creationDateToString from "../../utils/creation-date-to-string";
import getPostTypeSpecificData from "../../utils/get-post-type-specific-data";

interface PostComponentProps {
  postData: Post;
  email: string;
  fullName: string;
  isPreview?: boolean;
  userPostActionButton?: JSX.Element;
}

export default function PostComponent({ postData, email, fullName, isPreview, userPostActionButton }: PostComponentProps) {
  const [creationDateString, setCreationDateString] = useState("laddar...");
  const [expirationDateString, setExpirationDateString] = useState("laddar...");

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // UseEffect is used here to prevent hydration errors caused by differing times on server and client
  useEffect(() => {
    const dateCreationString = creationDateToString(postData.createdAt, timezone);
    setCreationDateString(dateCreationString);
    setExpirationDateString(postData.expiresAt.toLocaleDateString("sv-SE"));
  }, [postData.createdAt, postData.expiresAt, timezone]);

  const { postTypeColor } = getPostTypeSpecificData({
    postType: postData.postType,
  });

  return (
    <article className="rounded-2xl border border-border bg-card px-4 py-3 md:max-w-screen-md md:px-8 md:py-6">
      <figure>
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
          alt={`Bild för annonsen: ${postData.title}`}
          width={600}
          height={450}
          className="aspect-[4/3] w-full rounded-xl object-cover object-center"
        />
      </figure>
      <div className="mt-3 flex w-full flex-col gap-y-2">
        <div className="flex flex-wrap justify-between gap-x-2 pt-2 text-xs md:text-sm">
          <address className="flex items-center gap-x-1 capitalize not-italic">
            <MapPin className="shrink-0" size={16} />
            {postData.location}
          </address>
          <time dateTime={postData.createdAt.toISOString()} className="flex items-center gap-x-1 text-nowrap font-mono">
            <Clock className="shrink-0" size={16} />
            {creationDateString}
          </time>
        </div>
        <div className="flex flex-wrap justify-between gap-x-2 text-xs md:text-sm">
          <section className="flex items-center gap-x-1">
            <Tag className="shrink-0" size={16} />
            {postData.postType}
          </section>
          {postData.hasCustomExpirationDate && (
            <section className="flex items-center gap-x-1 text-warning">
              <CalendarClock className="shrink-0" size={16} />
              <time dateTime={postData.expiresAt.toISOString()} className="font-mono">
                {expirationDateString}
              </time>
            </section>
          )}
        </div>
        <h1 className="w-full break-words text-xl font-semibold md:text-2xl">{postData.title}</h1>
        <p className="w-full break-words text-sm md:pt-1 md:text-base">{postData.description}</p>
        <Link
          href={`/profile/${postData.userId}`}
          className={cn("mt-2 flex w-fit items-center hover:opacity-70", isPreview ? "pointer-events-none" : "")}
          aria-disabled={isPreview}
          tabIndex={isPreview ? -1 : undefined}
        >
          <User className="shrink-0" size={18} />
          <span className="line-clamp-1 break-all pl-1 text-sm md:text-lg">{fullName}</span>
        </Link>
        <div className="mt-auto flex w-full flex-wrap items-center justify-between gap-2 pt-2">
          <div>
            <ContactMeDialog fullName={fullName} email={email} disabled={isPreview} />
          </div>
          {userPostActionButton && <div className="flex flex-wrap gap-2">{userPostActionButton}</div>}
        </div>
      </div>
    </article>
  );
}
