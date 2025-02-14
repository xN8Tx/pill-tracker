import { z } from "zod";
import { registerDataSchema, loginDataSchema } from "../validation";

export type RegisterData = z.infer<typeof registerDataSchema>;
export type LoginData = z.infer<typeof loginDataSchema>;
