"use client";

import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from "lucide-react";
import { ReactElement } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  itemCount?: number;
  itemsPerPage: number;
  hashLinkId?: string;
}

export default function Pagination({ itemCount, itemsPerPage, hashLinkId }: PaginationProps) {
  const searchParams = new URLSearchParams(useSearchParams().toString());
  const pathname = usePathname();
  const { replace } = useRouter();

  const pages = itemCount ? Math.ceil(itemCount / itemsPerPage) : 1;
  const currentPage = Number(searchParams.get("page")) || 1;

  function handlePageChange(pageIndex: number) {
    const params = new URLSearchParams(searchParams);
    if (pageIndex > pages) {
      params.set("page", pages.toString());
    } else if (pageIndex > 1) {
      params.set("page", pageIndex.toString());
    } else {
      params.delete("page");
    }
    hashLinkId ? replace(`${pathname}?${params.toString()}#${hashLinkId}`) : replace(`${pathname}?${params.toString()}`);
  }

  const pageButtons: Array<ReactElement> = [];

  function generatePageButtons(startPage: number, endPage: number) {
    for (let pageIndex = startPage; pageIndex <= endPage; pageIndex++) {
      if (pageIndex === currentPage) {
        pageButtons.push(
          <button key={pageIndex} className="p-2 font-semibold underline md:p-4" onClick={() => handlePageChange(pageIndex)}>
            {pageIndex}
          </button>,
        );
      } else {
        pageButtons.push(
          <button className="p-2 md:p-4" key={pageIndex} onClick={() => handlePageChange(pageIndex)}>
            {pageIndex}
          </button>,
        );
      }
    }
  }

  if (pages > 5) {
    if (currentPage > 2 && currentPage < pages - 2) {
      generatePageButtons(currentPage - 2, currentPage + 2);
    } else if (currentPage <= 2) {
      generatePageButtons(1, 5);
    } else if (currentPage >= pages - 2) {
      generatePageButtons(pages - 4, pages);
    } else {
      return "Error generating page buttons.";
    }
  } else {
    generatePageButtons(1, pages);
  }

  if (pages <= 1) {
    return;
  } else {
    return (
      <div className="mt-4 flex items-center justify-center gap-x-2">
        <div className="flex items-center gap-x-2 p-2">
          {pages > 5 && (
            <button onClick={() => handlePageChange(1)}>
              <ChevronFirst className="h-4 w-4 md:h-6 md:w-6" />
            </button>
          )}
          <button onClick={() => handlePageChange(currentPage - 1)}>
            <ChevronLeft className="h-4 w-4 md:h-6 md:w-6" />
          </button>
        </div>
        <div className="flex justify-center gap-x-2 text-base md:text-xl">{pageButtons}</div>
        <div className="flex items-center gap-x-2 p-2">
          <button onClick={() => handlePageChange(currentPage + 1)}>
            <ChevronRight className="h-4 w-4 md:h-6 md:w-6" />
          </button>
          {pages > 5 && (
            <button onClick={() => handlePageChange(pages)}>
              <ChevronLast className="h-4 w-4 md:h-6 md:w-6" />
            </button>
          )}
        </div>
      </div>
    );
  }
}
