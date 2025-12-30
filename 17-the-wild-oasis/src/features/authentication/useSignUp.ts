import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signUp as signUpApi } from "../../services/apiAuth";

export function useSignUp() {
  const { isPending: isSigningUp, mutate: signUp } = useMutation({
    mutationFn: signUpApi,

    onSuccess: () => {
      toast.success(
        `User is signed up successfully! Please confirm the email address`
      );
    },

    onError: (error) => {
      toast.error(String(error?.message));
    },
  });
  return { isSigningUp, signUp };
}
