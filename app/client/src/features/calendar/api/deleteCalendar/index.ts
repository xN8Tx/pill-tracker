import type { Calendar } from "../../types";
import type { StrapiResponse } from "@/shared/types";

import { http } from "@/shared/api";

export const deleteCalendar = async ({
  documentId,
}: {
  documentId: string;
}) => {
  const response = await http.delete<StrapiResponse<Calendar>>(
    `/courses/${documentId}`,
  );

  if (response.status !== 200) {
    throw new Error(
      // eslint-disable-next-line
      (response?.data as any)["message"] ?? "Не удалось удалить данные",
    );
  }

  return response.data;
};
