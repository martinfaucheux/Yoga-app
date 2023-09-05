import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import SimpleNavbar from "./components/SimpleNavbar";
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
import { Fonts } from "./utils/Fonts";
import CalendarView from "./components/Calendar";
import BookingList from "./components/BookingList";
import TeacherBookingList from "./components/TeacherBookingList";
import {
  BrowserRouter as Router,
  Routes,
  Navigate,
  Route,
} from "react-router-dom";
import EmailVerificationRequest from "./components/EmailVerificationRequest";

// Create a custom theme and set the font family
const theme = extendTheme({
  fonts: {
    stylizedCursive: "Dancing Script, cursive",
    heading: "Libre Franklin",
    body: "Libre Franklin",
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
const toastOptions = {
  defaultOptions: { position: "bottom-left" },
  toastSpacing: "4rem",
};

function App() {
  return (
    <ChakraProvider theme={theme} toastOptions={toastOptions}>
      <Fonts />
      <Router>
        <SimpleNavbar />
        <MainContent />
        <CornerPicture />
      </Router>
    </ChakraProvider>
  );
}

const MainContent = () => {
  const { isAuthenticated, userData } = useAuth();
  const isTeacher = userData?.is_teacher === true;

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
        path="/request-reset-password"
        element={
          isAuthenticated ? <Navigate to="/" /> : <ResetPasswordRequest />
        }
      />
      <Route
        path="/reset-password"
        element={isAuthenticated ? <Navigate to="/" /> : <ResetPassword />}
      />

      <Route path="/verify" element={<EmailVerification />} />
      <Route path="/verify-request" element={<EmailVerificationRequest />} />

      {/* private routes */}
      <Route exact path="/sessions" element={<PrivateRoute />}>
        <Route path="/sessions" element={<CalendarView />} />
      </Route>
      <Route exact path="/bookings" element={<PrivateRoute />}>
        <Route path="/bookings" element={<BookingList />} />
      </Route>
      <Route exact path="/teacher-bookings" element={<PrivateRoute />}>
        <Route
          path="/teacher-bookings"
          element={<TeacherBookingList />}
          // element={isTeacher ? <TeacherBookingList /> : <BookingList />}
        />
      </Route>

      <Route path="/blog" element={<BlogPage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  );
};

export default App;
