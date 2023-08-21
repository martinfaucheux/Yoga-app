import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import SessionCardBoard from "./components/SessionCardBoard";
import SimpleNavbar from "./components/SimpleNavbar";
import SessionDetailPage from "./components/SessionDetailPage";
import BlogPage from "./components/BlogPage";
import AboutPage from "./components/AboutPage";
import LoginPage from "./components/LoginPage";
import RegistrationForm from "./components/RegistrationForm";
import CornerPicture from "./components/CornerPicture";
import PrivateRoute from "./components/PrivateRoute";
import EmailVerification from "./components/EmailVerification";
import ResetPasswordRequest from "./components/ResetPasswordRequest";
import ResetPassword from "./components/ResetPassword";
import NotFound from "./components/NotFound";
import { useAuth } from "./utils/AuthService";

import {
  BrowserRouter as Router,
  Routes,
  Navigate,
  Route,
} from "react-router-dom";

// Create a custom theme and set the font family
const theme = extendTheme({
  fonts: {
    stylizedCursive: "Dancing Script, cursive",
  },
  colors: {
    emerald: {
      50: "#e2fcf1",
      100: "#bef2d8",
      200: "#97e8bc",
      300: "#6fdea9",
      400: "#49d59a",
      500: "#30bb8a",
      600: "#249273",
      700: "#176857",
      800: "#093e38",
      900: "#001712",
    },
    sunset: {
      50: "#fff1de",
      100: "#fed6b3",
      200: "#f9bc86",
      300: "#f5a157",
      400: "#f18629",
      500: "#d76c10",
      600: "#a8540a",
      700: "#783c05",
      800: "#4a2300",
      900: "#1d0a00",
    },
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <SimpleNavbar />
        <MainContent />
        <CornerPicture />
      </Router>
    </ChakraProvider>
  );
}

const MainContent = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="*" element={<NotFound />} />

      <Route path="/" element={<Navigate to="sessions/" />} />
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />}
      />
      <Route
        path="/register"
        element={isAuthenticated ? <Navigate to="/" /> : <RegistrationForm />}
      />
      <Route
        path="/verify"
        element={isAuthenticated ? <Navigate to="/" /> : <EmailVerification />}
      />
      <Route
        path="/request-reset-password"
        element={
          isAuthenticated ? <Navigate to="/" /> : <ResetPasswordRequest />
        }
      />
      <Route
        path="/reset-password"
        element={isAuthenticated ? <Navigate to="/" /> : <ResetPassword />}
      />

      <Route exact path="/sessions" element={<PrivateRoute />}>
        <Route exact path="/sessions" element={<SessionCardBoard />} />
        <Route path="/sessions" element={<SessionCardBoard />} />
        <Route path="/sessions/:sessionId" element={<SessionDetailPage />} />
      </Route>

      <Route path="/blog" element={<BlogPage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  );
};

export default App;
