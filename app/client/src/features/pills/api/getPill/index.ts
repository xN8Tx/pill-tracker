import type { StrapiResponse } from "@/shared/types";
import type { Pill } from "../../types";

import { http } from "@/shared/api";

export const getPill = async () => {
  const response = await http.get<StrapiResponse<Pill[]>>("/pills");

  if (response.status !== 200) {
    throw new Error(
      // eslint-disable-next-line
      (response?.data as any)["message"] ?? "Не удалось получить данные",
    );
  }

  return response.data;
};
