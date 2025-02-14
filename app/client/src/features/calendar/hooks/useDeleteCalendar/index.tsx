import { useMutation, useQueryClient } from "react-query";
import { deleteCalendar } from "../../api";

export const useDeleteCalendar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCalendar,
    onSettled: () => {
      queryClient.invalidateQueries(["calendars"]);
    },
  });
};
