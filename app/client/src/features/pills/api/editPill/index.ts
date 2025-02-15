import type { CreatePills, Pill } from "../../types";
import type { StrapiResponse } from "@/shared/types";

import { http } from "@/shared/api";

export const editPill = async ({
  documentId,
  data,
}: {
  documentId: string;
  data: Partial<CreatePills>;
}) => {
  const response = await http.put<StrapiResponse<Pill>>(
    `/pills/${documentId}`,
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
