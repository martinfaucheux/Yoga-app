import axios from "axios";

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
    localStorage.setItem("jwtToken", token);
    setAuthToken(token);
    return response.data;
  },
  logout: () => {
    localStorage.removeItem("jwtToken");
    setAuthToken(null);
  },
  isAuthenticated: () => {
    const token = localStorage.getItem("jwtToken");
    return !!token; // Convert token to boolean
  },
};

export default AuthService;
