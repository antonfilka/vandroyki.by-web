import axios, { AxiosRequestConfig } from "axios";
import { getSession } from "next-auth/react";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

axiosInstance.interceptors.request.use(
  async (config: AxiosRequestConfig): Promise<any> => {
    const headers: AxiosRequestConfig["headers"] = config.headers ?? {};
    const session = await getSession();
    headers["Authorization"] = `Bearer ${session?.backendTokens.accessToken}`;

    return { ...config, headers };
  },
  (error) => {
    return Promise.reject(error);
  }
);
