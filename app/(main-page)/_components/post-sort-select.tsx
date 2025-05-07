"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { SortOrder } from "@/types/globals";
import handleSearchParamsChange from "@/utils/handle-search-params-change";

export default function PostSortSelect() {
  const pathname = usePathname();
  const searchParams = new URLSearchParams(useSearchParams().toString());
  const { replace } = useRouter();

  function handleSortingChange(value: string) {
    let sortOrder: SortOrder = value as SortOrder;
    sortOrder = sortOrder === "desc" ? undefined : sortOrder;
    handleSearchParamsChange("sort", sortOrder, pathname, searchParams, replace);
  }

  const currentSort = searchParams.get("sort") || "desc";

  return (
    <Select defaultValue={currentSort} onValueChange={handleSortingChange}>
      <SelectTrigger className="h-9 w-32 border border-input bg-background text-sm shadow-none">
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="end" className="text-xs md:text-sm">
        <SelectItem value="desc">Senast</SelectItem>
        <SelectItem value="asc">Äldst</SelectItem>
      </SelectContent>
    </Select>
  );
}
