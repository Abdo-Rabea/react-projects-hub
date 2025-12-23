// none -> {settings, isLoading}

import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

// get all settings
export function useSettings() {
  const {
    data: settings,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });
  return { settings, isPending, isError, error };
}
