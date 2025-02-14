import { useMutation, useQueryClient } from "react-query";
import { createPill } from "../../api";

export const useCreatePill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPill,
    onSettled: () => {
      queryClient.invalidateQueries(["pills"]);
    },
  });
};
