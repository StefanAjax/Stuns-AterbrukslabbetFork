"use client";

import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import handleSearchParamsChange from "@/utils/handle-search-params-change";
import type { PostType } from "@/types/globals";

export default function PostTypeButtons() {
  const pathname = usePathname();
  const searchParams = new URLSearchParams(useSearchParams().toString());
  const { replace } = useRouter();

  function handlePostTypeChange(postType: PostType) {
    handleSearchParamsChange("type", postType, pathname, searchParams, replace);
  }

  return (
    <div className="flex gap-x-3 rounded-md">
      <div className="flex items-center rounded-md bg-primary bg-opacity-40 text-xs md:text-lg">
        <button
          onClick={() => handlePostTypeChange(undefined)}
          className={clsx("rounded-s-md bg-primary bg-opacity-0 px-2 py-[6px] hover:bg-opacity-100 md:px-4 md:py-2", !searchParams.get("type") && "bg-opacity-100")}
        >
          Alla
        </button>
        <div className="h-5/6 w-[1px] bg-black bg-opacity-20 md:hidden"></div>
        <button
          onClick={() => handlePostTypeChange("Erbjuds")}
          className={clsx("bg-primary bg-opacity-0 px-2 py-[6px] hover:bg-opacity-100 md:px-4 md:py-2", searchParams.get("type") === "Erbjuds" && "bg-opacity-100")}
        >
          Erbjuds
        </button>
        <div className="h-5/6 w-[1px] bg-black bg-opacity-20 md:hidden"></div>
        <button
          onClick={() => handlePostTypeChange("Efterfrågas")}
          className={clsx("rounded-e-md bg-primary bg-opacity-0 px-2 py-[6px] hover:bg-opacity-100 md:px-4 md:py-2", searchParams.get("type") === "Efterfrågas" && "bg-opacity-100")}
        >
          Efterfrågas
        </button>
      </div>
    </div>
  );
}
