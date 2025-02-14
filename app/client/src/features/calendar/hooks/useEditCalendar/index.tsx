import { useMutation, useQueryClient } from "react-query";
import { editCalendar } from "../../api";

export const useEditCalendar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editCalendar,
    onSettled: () => {
      queryClient.invalidateQueries(["calendars"]);
    },
  });
};
