import "./App.css";
import { ChakraProvider, extendTheme, Heading, Text } from "@chakra-ui/react";
import SessionCardBoard from "./components/SessionCardBoard";
import SimpleNavbar from "./components/SimpleNavbar";
import { BrowserRouter, Routes, Navigate, Route } from "react-router-dom";

// Create a custom theme and set the font family
const theme = extendTheme({
  fonts: {
    stylizedCursive: "Dancing Script, cursive",
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <SimpleNavbar />
        <MainContent />
      </BrowserRouter>
    </ChakraProvider>
  );
}

const BlogPage = () => {
  return (
    <div>
      <Heading>Blogs</Heading>
      <Text>This is where blog posts will appear.</Text>
    </div>
  );
};

const AboutPage = () => {
  return (
    <div>
      <Heading>About</Heading>
      <Text>
        My name is Céline and I am the best Yoga teacher in the world!
      </Text>
    </div>
  );
};

const MainContent = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="sessions/" />} />
      <Route path="/sessions" element={<SessionCardBoard />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  );
};

export default App;
