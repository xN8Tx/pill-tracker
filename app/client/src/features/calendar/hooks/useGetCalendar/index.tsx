import { useQuery } from "react-query";
import { getCalendar } from "../../api";

export const useGetCalendar = () => {
  return useQuery({
    queryKey: ["calendars", "me"],
    queryFn: getCalendar,
  });
};
