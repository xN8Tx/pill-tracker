import { z } from "zod";
import { pillSchema } from "../validation";

export type Pill = {
  id: string;
  documentId: string;
  title: string;
  icon: string;
  startDate: Date;
  fullCount: number;
  dailyCount: number;
  createdAt: string;
  updatedAt: string;
};

export type CreatePills = z.infer<typeof pillSchema>;
