import { useMutation, useQueryClient } from "react-query";
import { deletePill } from "../../api";

export const useDeletePill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePill,
    onSettled: () => {
      queryClient.invalidateQueries(["pills"]);
    },
  });
};
