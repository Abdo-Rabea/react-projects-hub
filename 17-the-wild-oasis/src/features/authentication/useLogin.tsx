import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { login as apiLogin } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isPending: isLogingIn, mutate: login } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      apiLogin({ email, password }),

    onSuccess: (data) => {
      toast.success(`Welcome ${data.user.email?.split("@")[0] || "user"}`);
      queryClient.setQueryData(["user"], data.user);
      navigate("/");
    },

    onError: () => {
      toast.error("Please ensure your email and password are correct");
    },
  });
  return { isLogingIn, login };
}
