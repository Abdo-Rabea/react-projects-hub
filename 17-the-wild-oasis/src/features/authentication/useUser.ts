import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  // * note no error will be fired here bacause of getCurrentUser doesn't fire errors
  // console.log(page);
  const {
    data: user,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return {
    user,
    isPending,
    isError,
    error,
    isAuth: user?.role === "authenticated",
  };
}
