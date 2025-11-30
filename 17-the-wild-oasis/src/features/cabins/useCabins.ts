import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import type { Cabin } from "../../types/cabin";

export function useCabins() {
  const {
    data: cabins,
    isPending,
    isError,
    error,
  } = useQuery<Cabin[]>({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  return {
    cabins,
    isPending,
    isError,
    error,
  };
}
