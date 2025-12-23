import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";

export function useCheckout() {
  const queryClient = useQueryClient();

  const { isPending: isCheckingOut, mutate: checkout } = useMutation({
    mutationFn: (id: number) => updateBooking(id, { status: "checked-out" }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`);
      queryClient.invalidateQueries({ queryKey: ["booking"] });
    },

    onError: () => {
      toast.error("There was an error while checking out");
    },
  });
  return { isCheckingOut, checkout };
}
