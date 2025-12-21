import { useQuery } from "@tanstack/react-query";

import { getBooking } from "../../services/apiBookings";
import type { BookingWithRelations } from "../../types/Booking";
import { useParams } from "react-router-dom";

export function useBooking() {
  const { bookingId } = useParams();
  const {
    data: booking,
    isPending,
    isError,
    isFetching,
    error,
  } = useQuery<BookingWithRelations>({
    queryKey: ["booking"],
    queryFn: () => getBooking(Number(bookingId)),
    retry: false,
    refetchOnMount: true,
  });

  return {
    booking,
    isPending,
    isFetching,
    isError,
    error,
  };
}
