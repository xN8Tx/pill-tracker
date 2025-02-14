import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

import { login } from "../../api";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      navigate("/");
    },
  });
};
