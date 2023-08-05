import "./App.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import SessionCardBoard from "./components/SessionCardBoard";
import SimpleNavbar from "./components/SimpleNavbar";
import SessionDetailPage from "./components/SessionDetailPage";
import BlogPage from "./components/BlogPage";
import AboutPage from "./components/AboutPage";
import CornerPicture from "./components/CornerPicture";
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
  return (
    <Routes>
      <Route path="/" element={<Navigate to="sessions/" />} />
      <Route path="/sessions" element={<SessionCardBoard />} />
      <Route path="/sessions/:sessionId" element={<SessionDetailPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  );
};

export default App;
