import { useSearchParams } from "react-router-dom";
import { calcPaginationData } from "../utils/helpers";

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
  return calcPaginationData(currentPage, count);
}
