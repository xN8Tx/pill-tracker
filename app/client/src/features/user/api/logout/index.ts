import { http } from "@/shared/api";

export const logout = async () => {
  const response = await http.delete("/auth/local");

  if (response.status !== 200) {
    throw new Error(response.statusText);
  }

  return response.data;
};
