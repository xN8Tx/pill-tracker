import type { Calendar } from "../../types";
import { getEndDate } from "../getEndDate";

export const getRemainsDays = (calendar: Calendar): number => {
  return Math.floor(
    (getEndDate(calendar).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24),
  );
};
