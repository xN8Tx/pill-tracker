import type { RegisterData } from "../../types";
import { http } from "@/shared/api";

export const register = async ({ username, email, password }: RegisterData) => {
  const response = await http.post("/auth/local/register", {
    username,
    email,
    password,
  });

  if (response.status !== 200) {
    throw new Error(response.statusText);
  }

  return response.data;
};
