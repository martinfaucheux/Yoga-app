import axios from "axios";
import { AuthService } from "./AuthService";

export const customFetch = axios.create({
  // baseURL: "http://localhost:3000/api/",
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});

customFetch.interceptors.request.use(
  async (config) => {
    const token = AuthService.getLocalToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

customFetch.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      // TODO: Add more condition to check that it's about refresh token
      originalRequest._retry = true;

      const resp = await AuthService.refreshToken();
      // const accessToken = resp.response.access;

      // customFetch.defaults.headers.common[
      //   "Authorization"
      // ] = `Bearer ${accessToken}`;
      return customFetch(originalRequest);
    }
    return Promise.reject(error);
  }
);
