import axios from "axios";
import { createContext, useContext, useState } from "react";

const ACCESS_TOKEN_KEY = "jwtToken";
const REFRESH_TOKEN_KEY = "jwtRefreshToken";
const USER_DATA_KEY = "userData";

const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthService = {
  getLocalToken: () => localStorage.getItem(ACCESS_TOKEN_KEY),
  getLocalUserData: () => JSON.parse(localStorage.getItem(USER_DATA_KEY)),

  fetchToken: async (email, password) => {
    const response = await axios.post("/api/token/", {
      email,
      password,
    });
    localStorage.setItem(ACCESS_TOKEN_KEY, response.data.access);
    localStorage.setItem(REFRESH_TOKEN_KEY, response.data.refresh);
    return response.data;
  },
  refreshToken: async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    const response = await axios.post("/api/token/refresh/", {
      refresh: refreshToken,
    });
    localStorage.setItem(ACCESS_TOKEN_KEY, response.data.access);
  },
  removeToken: () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  },
  hasToken: () => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    return !!token;
  },
  fetchUserData: async (token) => {
    const response = await axios.get("/api/users/me/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(response.data));
    return response.data;
  },
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    AuthService.hasToken()
  );
  const [userData, setUserData] = useState(AuthService.getLocalUserData());

  const login = async (email, password) => {
    await AuthService.fetchToken(email, password);
    setIsAuthenticated(true);
    await AuthService.fetchUserData(AuthService.getLocalToken());
    setUserData(AuthService.getLocalUserData());
  };

  const logout = () => {
    AuthService.removeToken();
    setIsAuthenticated(false);
    setUserData(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
