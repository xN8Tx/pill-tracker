import { z } from "zod";
import { calendarSchema } from "../validation";

export type Calendar = {
  id: string;
  documentId: string;
  title: string;
  startDate: Date;
  days: number;
  createdAt: string;
  updatedAt: string;
};

export type CreateCalendar = z.infer<typeof calendarSchema>;
