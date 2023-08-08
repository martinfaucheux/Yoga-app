import axios from "axios";
import { createContext, useContext, useState } from "react";

const TOKEN_KEY = "jwtToken";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthService = {
  getLocalToken: () => localStorage.getItem(TOKEN_KEY),

  login: async (email, password) => {
    const response = await axios.post("/api/token/", {
      email,
      password,
    });
    const token = response.data.access;
    localStorage.setItem(TOKEN_KEY, token);
    return response.data;
  },
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
  },
  isAuthenticated: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    return !!token;
  },
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    AuthService.isAuthenticated()
  );

  const login = async (email, password) => {
    const response = await AuthService.login(email, password);
    setIsAuthenticated(true);
    return response;
  };

  const logout = () => {
    AuthService.logout();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
