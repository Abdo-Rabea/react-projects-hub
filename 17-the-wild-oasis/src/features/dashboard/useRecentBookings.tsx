// i want to put this hook inside the bookings folder but john. put it here

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";
import { subDays } from "date-fns";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();
  const numDays: number = Number(searchParams.get("last") ?? 7);
  const startDate = subDays(new Date(), numDays).toISOString();
  const {
    data: recentBookings,
    isPending: isPendingRecentBookings,
    isError,
    error,
  } = useQuery({
    queryKey: ["booking", `last-${numDays}`],
    queryFn: () => getBookingsAfterDate(startDate),
  });

  return {
    recentBookings,
    isPendingRecentBookings,
    numDays,
    isError,
    error,
  };
}
