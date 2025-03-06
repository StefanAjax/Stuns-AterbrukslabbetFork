"use client";

import { cn } from "@/lib/utils";
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
    <div className="flex rounded-md bg-primary text-xs text-neutral-900 md:text-lg">
      <button
        onClick={() => handlePostTypeChange(undefined)}
        className={cn("rounded-s-md px-2 py-1 hover:bg-primary-foreground hover:text-neutral-100 md:px-4 md:py-2", !searchParams.get("type") && "bg-primary-foreground text-neutral-100")}
      >
        Alla
      </button>
      <button
        onClick={() => handlePostTypeChange("Erbjuds")}
        className={cn("px-2 py-1 hover:bg-primary-foreground hover:text-neutral-100 md:px-4 md:py-2", searchParams.get("type") === "Erbjuds" && "bg-primary-foreground text-neutral-100")}
      >
        Erbjuds
      </button>
      <button
        onClick={() => handlePostTypeChange("Efterfrågas")}
        className={cn(
          "rounded-e-md px-2 py-1 hover:bg-primary-foreground hover:text-neutral-100 md:px-4 md:py-2",
          searchParams.get("type") === "Efterfrågas" && "bg-primary-foreground text-neutral-100",
        )}
      >
        Efterfrågas
      </button>
    </div>
  );
}
