import { useSearchParams } from "react-router-dom";

const PAGE_SIZE = 10;

/**
 * custom hook to calc. the paginations data using current page state in the url
 * @param count: total count of raw data to display
 * @returns
 */
export function usePaginationData({ count }: { count: number }) {
  const [searchParams] = useSearchParams();
  const currentPage: number = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  const totalPages: number = Math.ceil(count / PAGE_SIZE);
  if (currentPage > totalPages || currentPage <= 0)
    throw new Error("pagination out of range");

  const rangeStart: number = (currentPage - 1) * PAGE_SIZE + 1;
  const rangeEnd: number = Math.min(PAGE_SIZE * currentPage, count);

  const isFirstPage: boolean = currentPage === 1;
  const isLastPage: boolean = currentPage === totalPages;
  return {
    currentPage,
    rangeStart,
    rangeEnd,
    totalPages,
    isFirstPage,
    isLastPage,
  };
}
