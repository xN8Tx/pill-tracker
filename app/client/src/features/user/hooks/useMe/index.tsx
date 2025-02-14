import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

import { getMe } from "../../api";

export const useMe = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    onSuccess: () => {
      if (location.pathname.startsWith("/auth")) {
        navigate("/");
      }
    },
    onError: () => {
      if (!location.pathname.startsWith("/auth")) {
        navigate("/auth");
      }
    },
    retry: false,
  });
};
