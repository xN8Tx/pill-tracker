import { useQuery } from "react-query";
import { getPill } from "../../api";

export const useGetPill = () => {
  return useQuery({
    queryKey: ["pills", "me"],
    queryFn: getPill,
  });
};
