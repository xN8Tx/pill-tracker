import type { StrapiResponse } from "@/shared/types";
import type { CreatePills, Pill } from "../../types";

import { http } from "@/shared/api";

export const createPill = async (data: CreatePills) => {
  const response = await http.post<StrapiResponse<Pill>>("/pills", { data });

  if (response.status !== 200) {
    throw new Error(
      // eslint-disable-next-line
      (response?.data as any)["message"] ?? "Не удалось создать данные",
    );
  }

  return response.data;
};
