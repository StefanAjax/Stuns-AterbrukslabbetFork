"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import handleSearchParamsChange from "@/utils/handle-search-params-change";

interface SearchBarProps {
  labelText: string;
  itemsFoundCount?: number;
}

export default function SearchBar({ labelText, itemsFoundCount }: SearchBarProps) {
  const pathname = usePathname();
  const searchParams = new URLSearchParams(useSearchParams().toString());
  const { replace } = useRouter();
  const [showHint, setShowHint] = useState(false);
  const searchParamValue = searchParams.get("search");

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const searchInput = e.target.value;
    let query;

    if (searchInput && searchInput.length < 3) {
      query = undefined;
      setShowHint(true);
    } else {
      query = searchInput;
      setShowHint(false);
    }
    handleSearchParamsChange("search", query, pathname, searchParams, replace);
  }

  return (
    <form onSubmit={(e) => e.preventDefault()} className="w-full space-y-1">
      <div className="flex items-end justify-between">
        <Label htmlFor="search" className="text-sm font-medium md:text-lg">
          {labelText}
        </Label>
        {searchParamValue
          ? searchParamValue.length > 2 && <span className="text-xs md:text-base">{`${itemsFoundCount} resultat`}</span>
          : showHint && <span className="text-xs md:text-base">Minst 3 tecken</span>}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input id="search" className="bg-primary py-2 pl-9" placeholder="Sök..." onChange={handleSearchChange} defaultValue={searchParamValue?.toString()} autoComplete="on" />
      </div>
    </form>
  );
}
