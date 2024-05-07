// axiosConfig.js
import axios from "axios";
import {
  getLocalAccessToken,
  getLocalRefreshToken,
  updateLocalAccessToken,
  removeUser
} from "./TokenService";

const axiosInstance = axios.create({
  baseURL: "https://crmbackend-glutape-staging.herokuapp.com/",
});

axiosInstance.interceptors.request.use(
  (config) => {

    const accessToken = getLocalAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.data &&
      error.response.data.errors &&
      error.response.data.errors.code === "token_not_valid" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; 
      const refreshToken = getLocalRefreshToken();
      if (!refreshToken) {
        removeUser(); // Assuming removeUser redirects to login or does clean-up
        return Promise.reject(new Error("No refresh token available"));
      }
      try {
        const { data } = await axiosInstance.post("/api/token/refresh/", { refresh: refreshToken });
        updateLocalAccessToken(data.access);
        originalRequest.headers.Authorization = `Bearer ${data.access}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        removeUser();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export { axiosInstance };
