import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isPending: isLogingOut, mutate: logout } = useMutation({
    mutationFn: logoutApi,

    onSuccess: () => {
      toast.success(`Goodbye 🖖`);
      queryClient.removeQueries();
      navigate("/login");
    },

    onError: () => {
      toast.error("An error happens while logging out");
    },
  });
  return { isLogingOut, logout };
}
