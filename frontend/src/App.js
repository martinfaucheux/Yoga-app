import logo from "./logo.svg";
import "./App.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import SessionCardBoard from "./components/SessionCardBoard";
import SimpleNavbar from "./components/SimpleNavbar";

// Create a custom theme and set the font family
const theme = extendTheme({
  fonts: {
    stylizedCursive: "Dancing Script, cursive",
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <SimpleNavbar />
      <SessionCardBoard />
    </ChakraProvider>
  );
}

const DefaultReactIndexPage = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
