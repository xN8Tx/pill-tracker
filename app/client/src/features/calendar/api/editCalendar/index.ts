import type { CreateCalendar, Calendar } from "../../types";
import type { StrapiResponse } from "@/shared/types";

import { http } from "@/shared/api";

export const editCalendar = async ({
  documentId,
  data,
}: {
  documentId: string;
  data: Partial<CreateCalendar>;
}) => {
  const response = await http.put<StrapiResponse<Calendar>>(
    `/courses/${documentId}`,
    data,
  );

  if (response.status !== 200) {
    throw new Error(
      // eslint-disable-next-line
      (response?.data as any)["message"] ?? "Не удалось обновить данные",
    );
  }

  return response.data;
};
