import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export function useTodayActivities() {
  const { isPending, data: todayActivities } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ["today-activities"],
  });
  return { isPending, todayActivities };
}
