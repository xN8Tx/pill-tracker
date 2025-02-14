import { useMutation, useQueryClient } from "react-query";
import { createCalendar } from "../../api";

export const useCreateCalendar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCalendar,
    onSettled: () => {
      queryClient.invalidateQueries(["calendars"]);
    },
  });
};
