import api from "./axiosInstance";
import type { LoginData, RegisterData, User } from "../types/index";

export const authService = {
  login: async (data: LoginData) => {
    const response = await api.post<{ token: string; user: User }>(
      "/auth/login",
      data,
    );
    return response.data;
  },
  register: async (data: RegisterData) => {
    const response = await api.post("/auth/register", data);
    return response.data;
  },
  getProfile: async () => {
    const response = await api.get<User>("/auth/me");
    return response.data;
  },
};
