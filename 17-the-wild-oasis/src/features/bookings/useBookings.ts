import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import type { BookingWithRelations } from "../../types/Booking";
import { useSearchParams } from "react-router-dom";
import type { BookingFilter } from "../../types/filters";
import { usePaginationData } from "../../hooks/usePaginationData";
import { calcPaginationData } from "../../utils/helpers";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const { rangeStart, rangeEnd, currentPage } = usePaginationData({
    count: Number.MAX_SAFE_INTEGER,
  });
  // 1) filter
  const filterValue = searchParams.get("status");
  const filter: BookingFilter | null =
    filterValue === null || filterValue === "all"
      ? null
      : {
          field: "status",
          value: filterValue,
          method: "eq",
        };

  // 2. SORT
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [sortField, direction] = sortByRaw.split("-");
  const sortBy = { field: sortField, direction };

  // 3. PAGINATION
  const paginationRange = { rangeStart, rangeEnd };
  const {
    data: { data: bookings, count } = {},
    isPending,
    isError,
    error,
  } = useQuery<{ data: BookingWithRelations[]; count: number | null }>({
    queryKey: ["bookings", filter, sortBy, paginationRange],
    queryFn: () => getBookings({ filter, sortBy, paginationRange }),
  });

  // * pre-fetching next page
  // prefetch only of you are on in the last page
  if (currentPage < Math.ceil((count || Number.MAX_SAFE_INTEGER) / PAGE_SIZE)) {
    const { rangeStart: nextRangeStart, rangeEnd: nextRangeEnd } =
      calcPaginationData(currentPage + 1, Number.MAX_SAFE_INTEGER);

    const nextPaginationRange = {
      rangeStart: nextRangeStart,
      rangeEnd: nextRangeEnd,
    };
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, nextPaginationRange],
      queryFn: () =>
        getBookings({
          filter,
          sortBy,
          paginationRange: nextPaginationRange,
        }),
    });
  }

  // * prefetching previous page
  if (currentPage > 1) {
    const { rangeStart: prevRangeStart, rangeEnd: prevRangeEnd } =
      calcPaginationData(currentPage - 1, Number.MAX_SAFE_INTEGER);

    const prevPaginationRange = {
      rangeStart: prevRangeStart,
      rangeEnd: prevRangeEnd,
    };
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, prevPaginationRange],
      queryFn: () =>
        getBookings({
          filter,
          sortBy,
          paginationRange: prevPaginationRange,
        }),
    });
  }
  return {
    count,
    bookings,
    isPending,
    isError,
    error,
  };
}
