import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { register } from "../../api";

export const useRegister = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: register,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      navigate("/");
    },
  });
};
