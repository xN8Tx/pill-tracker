import type { LoginData } from "../../types";
import { http } from "@/shared/api";

export const login = async ({ email, password }: LoginData) => {
  const response = await http.post("/auth/local", {
    identifier: email,
    password,
  });

  if (response.status !== 200) {
    throw new Error(response.statusText);
  }

  return response.data;
};
