import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const accessKey = window.localStorage.getItem("accessKey");
  if (accessKey) {
    config.headers.Authorization = `Bearer ${accessKey}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = window.localStorage.getItem("refreshToken");
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh`,
          {
            refreshToken,
          }
        );
        const { accessToken } = response.data;
        window.localStorage.setItem("accessKey", accessToken);
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (e) {
        console.error("Unable to refresh token", e);
        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  }
);
