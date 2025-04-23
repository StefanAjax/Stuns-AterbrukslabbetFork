"use client";

import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Pagination as ShadcnPagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";

interface PaginationProps {
  itemCount?: number;
  itemsPerPage: number;
  hashLinkId?: string;
}

export default function Pagination({ itemCount, itemsPerPage, hashLinkId }: PaginationProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const pages = itemCount ? Math.ceil(itemCount / itemsPerPage) : 1;
  const currentPage = Number(searchParams.get("page")) || 1;

  function handlePageChange(pageIndex: number) {
    const params = new URLSearchParams(searchParams.toString());
    if (pageIndex > pages) {
      params.set("page", pages.toString());
    } else if (pageIndex > 1) {
      params.set("page", pageIndex.toString());
    } else {
      params.delete("page");
    }
    hashLinkId ? replace(`${pathname}?${params.toString()}#${hashLinkId}`) : replace(`${pathname}?${params.toString()}`);
  }

  if (pages <= 1) return null;

  const pageNumbers = [];

  const numPagesAround = 2;
  const startPage = Math.max(1, currentPage - numPagesAround);
  const endPage = Math.min(pages, currentPage + numPagesAround);

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <ShadcnPagination className="mt-10">
      <PaginationContent>
        <PaginationItem>
          <PaginationLink onClick={() => handlePageChange(1)} className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}>
            <ChevronFirst />
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationLink onClick={() => handlePageChange(currentPage - 1)} className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}>
            <ChevronLeft />
          </PaginationLink>
        </PaginationItem>

        {pageNumbers.map((pageNumber) => (
          <PaginationItem key={pageNumber}>
            <PaginationLink isActive={pageNumber === currentPage} onClick={() => handlePageChange(pageNumber)} className="cursor-pointer">
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationLink onClick={() => handlePageChange(currentPage + 1)} className={currentPage === pages ? "pointer-events-none opacity-50" : "cursor-pointer"}>
            <ChevronRight />
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationLink onClick={() => handlePageChange(pages)} className={currentPage === pages ? "pointer-events-none opacity-50" : "cursor-pointer"}>
            <ChevronLast />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </ShadcnPagination>
  );
}
