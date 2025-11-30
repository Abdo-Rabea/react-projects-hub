import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CabinPayload } from "../../types/FormCabin";
import { createEditCabin as createEditCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateEditCabin(isEditSession: boolean = false) {
  const queryClient = useQueryClient();
  const { mutate: createEditCabin, isPending: isWorking } = useMutation({
    mutationFn: ({ data, id }: { data: CabinPayload; id?: number }) =>
      createEditCabinApi(data, id),
    onSuccess: () => {
      // reset the form
      // reset();

      // invalidate to refetch the cabins data to update ui
      queryClient.invalidateQueries({ queryKey: ["cabins"] });

      toast.success(
        isEditSession
          ? "Cabin is edited successfully"
          : "Cabin is created successfully"
      );
    },
    onError(er) {
      toast.error(er.message);
    },
  });
  return { createEditCabin, isWorking };
}
