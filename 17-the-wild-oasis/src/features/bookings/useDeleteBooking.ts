import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: deleteBookingApi,
    mutationKey: ["bookings"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      toast.success("booking deleted successfully");
    },
    // * the error passed here is the one thrown using mutation function
    onError: (e) => {
      toast.error(e.message);
    },
  });
  return { isDeleting, deleteBooking };
}
