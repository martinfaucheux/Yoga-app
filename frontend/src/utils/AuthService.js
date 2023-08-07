import axios from "axios";
import { createContext, useContext, useState } from "react";

const TOKEN_KEY = "jwtToken";

// Set the default authorization header initially
const token = localStorage.getItem(TOKEN_KEY);
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

const AuthService = {
  login: async (email, password) => {
    const response = await axios.post("/api/token/", {
      email,
      password,
    });
    const token = response.data.access;
    localStorage.setItem(TOKEN_KEY, token);
    setAuthToken(token);
    return response.data;
  },
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    setAuthToken(null);
  },
  isAuthenticated: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    return !!token; // Convert token to boolean
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
