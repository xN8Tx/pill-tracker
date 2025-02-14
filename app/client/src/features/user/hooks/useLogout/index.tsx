import { useMutation, useQueryClient } from "react-query";
import { logout } from "../../api";

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["me"] });
    },
  });
};
