"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import handleSearchParamsChange from "@/utils/handle-search-params-change";
import type { PostType } from "@/types/globals";

export default function PostTypeButtons() {
  const pathname = usePathname();
  const searchParams = new URLSearchParams(useSearchParams().toString());
  const { replace } = useRouter();

  function handlePostTypeChange(postType: PostType) {
    const currentType = searchParams.get("type");
    if (postType === currentType) {
      postType = undefined;
    }
    handleSearchParamsChange("type", postType, pathname, searchParams, replace);
  }

  const isActive = (type: string | undefined) => {
    const currentType = searchParams.get("type");
    return type && currentType === type;
  };

  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Typ:</span>
      <div className="flex gap-1">
        <Button onClick={() => handlePostTypeChange("Erbjuds")} variant={isActive("Erbjuds") ? "secondary" : "outline"} size="sm">
          Erbjuds
        </Button>
        <Button onClick={() => handlePostTypeChange("Efterfrågas")} variant={isActive("Efterfrågas") ? "secondary" : "outline"} size="sm">
          Efterfrågas
        </Button>
      </div>
    </div>
  );
}
