import axios from "axios";
import { AuthService } from "./AuthService";

const isTokenExpired = (response) => {
  console.log(response);
  return (
    [403, 401].includes(response.status) &&
    response.data.code === "token_not_valid"
  );
};

export const customFetch = axios.create({
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
    if (isTokenExpired(error.response) && !originalRequest._retry) {
      originalRequest._retry = true;

      await AuthService.refreshToken();
      return customFetch(originalRequest);
    }
    return Promise.reject(error);
  }
);
