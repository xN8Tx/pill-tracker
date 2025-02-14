import { Calendar } from "../../types";

export const getDayPassed = (calendar: Calendar): number => {
  return Math.floor(
    (new Date().getTime() - new Date(calendar.startDate).getTime()) /
      (1000 * 60 * 60 * 24),
  );
};
