"use client";

import { Clock, MapPin, User } from "lucide-react";
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

  const { postTypeColor, expirationDateText } = getPostTypeSpecificData({
    postType: postData.postType,
  });
  return (
    <article className="mx-auto max-w-[360px] rounded-2xl bg-secondary px-6 pb-4 pt-3 md:max-w-screen-md md:px-16 md:pb-6 md:pt-10">
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
        alt="annonsens bild"
        width={600}
        height={450}
        className="aspect-[4/3] w-full rounded-md"
      />
      <div className="flex w-full flex-col gap-y-1">
        <div className="flex justify-between pt-2 text-xs md:text-base">
          <section className="flex items-center gap-x-1 capitalize">
            <MapPin className="hidden shrink-0 md:block" size={16} />
            <MapPin className="block shrink-0 md:hidden" size={12} />
            {postData.location}
          </section>
          <section className="flex items-center gap-x-1 text-nowrap text-end">
            <Clock className="hidden md:block" size={16} />
            <Clock className="block md:hidden" size={12} />
            {creationDateString}
          </section>
        </div>
        <div className="flex h-10 justify-between text-xs md:h-14 md:text-base">
          <section className="flex h-1/2 items-center gap-x-1">
            <div className={cn("h-3 w-3 rounded-[50%] md:h-4 md:w-4", postTypeColor)} />
            {postData.postType}
          </section>
          {postData.hasCustomExpirationDate && (
            <section className="text-end text-red-500">
              <p>{expirationDateText}</p>
              <p>{expirationDateString}</p>
            </section>
          )}
        </div>
        <h1 className="w-full break-words text-2xl md:text-3xl">{postData.title}</h1>
        <p className="w-full break-words text-xs md:pt-2 md:text-base">{postData.description}</p>
        <Link href={`/profile/${postData.userId}`} className={cn("mt-4 flex w-fit items-center hover:opacity-70", isPreview ? "pointer-events-none" : "")} aria-disabled={isPreview}>
          <User className="hidden shrink-0 md:block" size={18} />
          <User className="block shrink-0 md:hidden" size={12} />
          <p className="line-clamp-1 break-all pl-1 text-sm md:text-xl">{fullName}</p>
        </Link>
        <div className="flex w-full items-center justify-between">
          <div>
            <ContactMeDialog fullName={fullName} email={email} disabled={isPreview} />
          </div>
          {userPostActionButton && <div className="flex gap-x-2">{userPostActionButton}</div>}
        </div>
      </div>
    </article>
  );
}
