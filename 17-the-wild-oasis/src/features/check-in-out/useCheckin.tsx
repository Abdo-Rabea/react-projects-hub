import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isPending: isCheckingIn, mutate: checkin } = useMutation({
    mutationFn: ({
      id,
      breakfast,
    }: {
      id: number;
      breakfast?: {
        hasBreakfast: boolean;
        totalPrice: number;
        extrasPrice: number;
      };
    }) =>
      updateBooking(id, { status: "checked-in", isPaid: true, ...breakfast }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      queryClient.invalidateQueries({ queryKey: ["booking"] });
      navigate("/");
    },

    onError: () => {
      toast.error("There was an error while checking in");
    },
  });
  return { isCheckingIn, checkin };
}
