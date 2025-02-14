import { API_URL } from "@/shared/constants";
import axios from "axios";

export const http = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
