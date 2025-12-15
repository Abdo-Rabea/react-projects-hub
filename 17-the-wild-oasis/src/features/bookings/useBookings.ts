import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import type { BookingWithRelations } from "../../types/Booking";
import { useSearchParams } from "react-router-dom";
import type { BookingFilter } from "../../types/filters";
import { usePaginationData } from "../../hooks/usePaginationData";

export function useBookings() {
  const [searchParams] = useSearchParams();
  const { rangeStart, rangeEnd } = usePaginationData({
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

  return {
    count,
    bookings,
    isPending,
    isError,
    error,
  };
}
