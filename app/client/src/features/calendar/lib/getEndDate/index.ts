import { Calendar } from "../../types";

export const getEndDate = (calendar: Calendar): Date => {
  const endDate = new Date(calendar.startDate);
  endDate.setDate(endDate.getDate() + calendar.days);
  return endDate;
};
