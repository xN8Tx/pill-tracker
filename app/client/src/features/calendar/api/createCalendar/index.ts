import type { StrapiResponse } from "@/shared/types";
import type { CreateCalendar, Calendar } from "../../types";

import { http } from "@/shared/api";

export const createCalendar = async (data: CreateCalendar) => {
  const response = await http.post<StrapiResponse<Calendar>>("/courses", data);

  if (response.status !== 200) {
    throw new Error(
      // eslint-disable-next-line
      (response?.data as any)["message"] ?? "Не удалось создать данные",
    );
  }

  return response.data;
};
