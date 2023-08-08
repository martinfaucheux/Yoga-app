import axios from "axios";
import { createContext, useContext, useState } from "react";

const ACCESS_TOKEN_KEY = "jwtToken";
const REFRESH_TOKEN_KEY = "jwtRefreshToken";

const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthService = {
  getLocalToken: () => localStorage.getItem(ACCESS_TOKEN_KEY),

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
    console.log("refresh access token");
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
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    AuthService.hasToken()
  );

  const login = async (email, password) => {
    const response = await AuthService.fetchToken(email, password);
    setIsAuthenticated(true);
    return response;
  };

  const logout = () => {
    AuthService.removeToken();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
