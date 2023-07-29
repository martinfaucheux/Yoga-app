import logo from "./logo.svg";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import {
  ButtonGroup,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  SimpleGrid,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <CardBoard />
    </ChakraProvider>
  );
}

const CardBoard = () => (
  <SimpleGrid
    spacing={4}
    templateColumns="repeat(auto-fill, minmax(400px, 1fr))"
  >
    <CardComponent />
    <CardComponent />
    <CardComponent />
    <CardComponent />
    <CardComponent />
    <CardComponent />
    <CardComponent />
    <CardComponent />
    <CardComponent />
  </SimpleGrid>
);

const CardComponent = () => (
  <Card maxW="sm">
    <CardBody>
      <Image
        src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1220&q=80"
        alt="Woman doing yoga"
        borderRadius="lg"
      />
      <Stack mt="6" spacing="3">
        <Heading size="md">Yoga by the lake</Heading>
        <Text>
          Flow with the serenity of Annecy lake in a rejuvenating Vinyasa yoga
          class, harmonizing breath and movement amidst breathtaking natural
          beauty.
        </Text>
        {/* <Text color="blue.600" fontSize="2xl">
          $450
        </Text> */}
      </Stack>
    </CardBody>
    {/* <Divider />
    <CardFooter>
      <ButtonGroup spacing="2">
        <Button variant="solid" colorScheme="blue">
          Buy now
        </Button>
        <Button variant="ghost" colorScheme="blue">
          Add to cart
        </Button>
      </ButtonGroup>
    </CardFooter> */}
  </Card>
);

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
