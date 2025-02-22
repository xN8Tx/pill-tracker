import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

import { useIsOnline } from "@/features/isOnline";
import { getMe } from "../../api";

export const useMe = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isOnline = useIsOnline();

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
    enabled: isOnline,
    retry: false,
    staleTime: 1000 * 60 * 60, // 1 hour
    cacheTime: 1000 * 60 * 60 * 24 * 2, // 2 days
  });
};
