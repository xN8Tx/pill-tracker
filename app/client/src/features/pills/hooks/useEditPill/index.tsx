import { useMutation, useQueryClient } from "react-query";
import { editPill } from "../../api";

export const useEditPill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editPill,
    onSettled: () => {
      queryClient.invalidateQueries(["pills"]);
    },
  });
};
