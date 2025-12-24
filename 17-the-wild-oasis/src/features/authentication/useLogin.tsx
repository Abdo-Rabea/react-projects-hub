import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { login as apiLogin } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();
  const { isPending: isLogingIn, mutate: login } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      apiLogin({ email, password }),

    onSuccess: () => {
      toast.success(`Welcome user name`);
      navigate("/");
    },

    onError: () => {
      toast.error("Please ensure your email and password are correct");
    },
  });
  return { isLogingIn, login };
}
