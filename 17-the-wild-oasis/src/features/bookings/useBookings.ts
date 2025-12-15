import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import type { BookingWithRelations } from "../../types/Booking";
import { useSearchParams } from "react-router-dom";
import type { BookingFilter } from "../../types/filters";

export function useBookings() {
  const [searchParams] = useSearchParams();

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
  const {
    data: bookings,
    isPending,
    isError,
    error,
  } = useQuery<BookingWithRelations[]>({
    queryKey: ["bookings", filter, sortBy],
    queryFn: () => getBookings({ filter, sortBy }),
  });

  return {
    bookings,
    isPending,
    isError,
    error,
  };
}
