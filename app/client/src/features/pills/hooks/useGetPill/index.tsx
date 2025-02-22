import { useQuery } from "react-query";
import { getPill } from "../../api";

export const useGetPill = () => {
  return useQuery({
    queryKey: ["pills", "me"],
    queryFn: getPill,
    staleTime: 1000 * 60 * 60, // 1 hour
    cacheTime: 1000 * 60 * 60 * 24 * 2, // 2 days
  });
};
