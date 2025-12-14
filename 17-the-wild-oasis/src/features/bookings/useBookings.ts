import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import type { BookingWithRelations } from "../../types/Booking";

export function useBookings() {
  const {
    data: bookings,
    isPending,
    isError,
    error,
  } = useQuery<BookingWithRelations[]>({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });

  return {
    bookings,
    isPending,
    isError,
    error,
  };
}
