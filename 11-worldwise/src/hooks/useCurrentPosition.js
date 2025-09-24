import { useSearchParams } from "react-router-dom";

export function useCurrentPosition() {
  const [searchParams, setSearchParams] = useSearchParams();
  // !wow: changing lat, lng in search queries will cause this component to re-render   wow
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  return { lat, lng, setSearchParams };
}
