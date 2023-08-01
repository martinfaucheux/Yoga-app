import logo from "./logo.svg";
import "./App.css";
import { ChakraProvider, Heading } from "@chakra-ui/react";
import SessionCardBoard from "./components/SessionCardBoard";
import SimpleNavbar from "./components/SimpleNavbar";

function App() {
  return (
    <ChakraProvider>
      <SimpleNavbar />
      {/* <Heading>Here are some sessions that could interest you</Heading> */}
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
