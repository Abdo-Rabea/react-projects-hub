// i want to put this hook inside the bookings folder but john. put it here

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";
import { subDays } from "date-fns";

export function useRecentStays() {
  const [searchParams] = useSearchParams();
  const numDays: number = Number(searchParams.get("last") ?? 7);
  const startDate = subDays(new Date(), numDays).toISOString();
  const {
    data,
    isPending: isPendingRecentStays,
    isError,
    error,
  } = useQuery({
    queryKey: ["Stays", `last-${numDays}`],
    queryFn: () => getStaysAfterDate(startDate),
  });

  const recentStays =
    data?.filter((stay) => stay.status !== "unconfirmed") || [];
  return {
    recentStays,
    isPendingRecentStays,
    isError,
    error,
  };
}
