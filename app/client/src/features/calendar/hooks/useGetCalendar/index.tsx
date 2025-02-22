import { useQuery } from "react-query";
import { getCalendar } from "../../api";

export const useGetCalendar = () => {
  return useQuery({
    queryKey: ["calendars", "me"],
    queryFn: getCalendar,
    staleTime: 1000 * 60 * 60, // 1 hour
    cacheTime: 1000 * 60 * 60 * 24 * 2, // 2 days
  });
};
