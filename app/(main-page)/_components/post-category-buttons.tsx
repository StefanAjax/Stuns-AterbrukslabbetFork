"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import handleSearchParamsChange from "@/utils/handle-search-params-change";
import type { PostCategory } from "@/types/globals";

export default function PostCategoryButtons() {
  const pathname = usePathname();
  const searchParams = new URLSearchParams(useSearchParams().toString());
  const { replace } = useRouter();

  function handlePostCategoryChange(postCategory: PostCategory) {
    handleSearchParamsChange("category", postCategory, pathname, searchParams, replace);
  }

  return (
    <div className="flex gap-x-3 rounded-md">
      <div className="flex items-center rounded-md bg-primary bg-opacity-40 text-[9px] md:text-base">
        <button
          onClick={() => handlePostCategoryChange(undefined)}
          className={cn("rounded-s-md bg-primary bg-opacity-0 px-[6px] py-1 hover:bg-opacity-100 md:px-3 md:py-[8px]", !searchParams.get("category") && "bg-opacity-100")}
        >
          Alla
        </button>
        <div className="h-5/6 w-[1px] bg-black bg-opacity-20 md:hidden"></div>
        <button
          onClick={() => handlePostCategoryChange("förbrukningsvara")}
          className={cn("bg-primary bg-opacity-0 px-[6px] py-1 hover:bg-opacity-100 md:px-3 md:py-[8px]", searchParams.get("category") === "förbrukningsvara" && "bg-opacity-100")}
        >
          Förbrukningsvara
        </button>
        <div className="h-5/6 w-[1px] bg-black bg-opacity-20 md:hidden"></div>
        <button
          onClick={() => handlePostCategoryChange("instrument/maskin")}
          className={cn("bg-primary bg-opacity-0 px-[6px] py-1 hover:bg-opacity-100 md:px-3 md:py-[8px]", searchParams.get("category") === "instrument/maskin" && "bg-opacity-100")}
        >
          Instrument/Maskin
        </button>
        <div className="h-5/6 w-[1px] bg-black bg-opacity-20 md:hidden"></div>
        <button
          onClick={() => handlePostCategoryChange("inventarie")}
          className={cn("rounded-e-md bg-primary bg-opacity-0 px-[6px] py-1 hover:bg-opacity-100 md:px-3 md:py-[8px]", searchParams.get("category") === "inventarie" && "bg-opacity-100")}
        >
          Inventarie
        </button>
      </div>
    </div>
  );
}
