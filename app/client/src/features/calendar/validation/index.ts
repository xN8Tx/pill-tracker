import { z } from "zod";

const today = new Date();
today.setHours(0, 0, 0, 0);

const dateScheme = z.date({ message: "Пожалуйста выберите дату" }).refine(
  (date) => {
    const inputDate = new Date(date);
    inputDate.setHours(0, 0, 0, 0);

    return inputDate <= today;
  },
  {
    message: "Дата не должна быть больше сегодняшней",
  },
);

export const calendarSchema = z.object({
  startDate: dateScheme,
  days: z.number({ message: "Это поле должно быть числом" }),
  title: z.string({ message: "Пожалуйста введите название" }),
});
