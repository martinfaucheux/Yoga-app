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
