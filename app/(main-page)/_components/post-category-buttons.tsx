"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import handleSearchParamsChange from "@/utils/handle-search-params-change";
import type { PostCategory } from "@/types/globals";

export default function PostCategoryButtons() {
  const pathname = usePathname();
  const searchParams = new URLSearchParams(useSearchParams().toString());
  const { replace } = useRouter();

  function handlePostCategoryChange(postCategory: PostCategory) {
    const currentCategory = searchParams.get("category");
    if (postCategory === currentCategory) {
      postCategory = undefined;
    }
    handleSearchParamsChange("category", postCategory, pathname, searchParams, replace);
  }

  const isActive = (category: string | undefined) => {
    const currentCategory = searchParams.get("category");
    return category && currentCategory === category;
  };

  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Kategori:</span>
      <div className="flex flex-wrap gap-x-1 gap-y-2">
        <Button onClick={() => handlePostCategoryChange("förbrukningsvara")} variant={isActive("förbrukningsvara") ? "default" : "outline"} size="sm">
          Förbrukningsvara
        </Button>
        <Button onClick={() => handlePostCategoryChange("instrument/maskin")} variant={isActive("instrument/maskin") ? "default" : "outline"} size="sm">
          Instrument/Maskin
        </Button>
        <Button onClick={() => handlePostCategoryChange("inventarie")} variant={isActive("inventarie") ? "default" : "outline"} size="sm">
          Inventarie
        </Button>
      </div>
    </div>
  );
}
