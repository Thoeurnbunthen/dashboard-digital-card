import React from "react";
import { Button } from "@/components/ui/button";

export interface PaginationProps {
  currentPage: number; // starts at 1
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const generatePages = (): (number | string)[] => {
    const delta = 2;
    const pages: (number | string)[] = [];

    // Handle case where totalPages is very small
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    const left = Math.max(2, currentPage - delta);
    const right = Math.min(totalPages - 1, currentPage + delta);

    // Always show first page
    pages.push(1);

    // Add ellipsis if there's a gap after page 1
    if (left > 2) {
      pages.push("...");
    }

    // Add middle pages, but avoid duplicating page 1 or last page
    for (let i = left; i <= right; i++) {
      if (i !== 1 && i !== totalPages) {
        pages.push(i);
      }
    }

    // Add ellipsis if there's a gap before last page
    if (right < totalPages - 1) {
      pages.push("...");
    }

    // Always show last page (avoid duplicate)
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pageList = generatePages();

  return (
    <div className="flex items-center space-x-2">
      {/* Previous button */}
      <Button
        variant="outline"
        size="sm"
        className="cursor-pointer"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </Button>

      {/* Page numbers */}
      {pageList.map((page, index) =>
        page === "..." ? (
          <span
            key={`ellipsis-${index}`}
            className="px-2 text-muted-foreground"
          >
            ...
          </span>
        ) : (
          <Button
            key={`page-${page}`}
            size="sm"
            variant={page === currentPage ? "default" : "outline"}
            className="h-8 w-8 p-0 cursor-pointer"
            onClick={() => onPageChange(page as number)}
          >
            {page}
          </Button>
        )
      )}

      {/* Next button */}
      <Button
        variant="outline"
        size="sm"
        className="cursor-pointer"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
};
