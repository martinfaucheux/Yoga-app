import axios from "axios";

const TOKEN_KEY = "jwtToken";

// Set the default authorization header initially
const token = localStorage.getItem(TOKEN_KEY);
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

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

export default AuthService;
