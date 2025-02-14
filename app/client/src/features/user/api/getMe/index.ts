import { http } from "@/shared/api";

export const getMe = async () => {
  const response = await http.get("/users/me");

  if (response.status !== 200) {
    throw new Error(response.statusText);
  }

  return response.data;
};
