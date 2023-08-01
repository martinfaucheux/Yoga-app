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

const SessionCard = () => (
  <Card maxW="sm" background="#A2EAC3">
    <CardBody>
      <Image
        src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1220&q=80"
        alt="Woman doing yoga"
        borderRadius="lg"
      />
      <Stack mt="6" spacing="2">
        <Heading size="md">Yoga by the lake</Heading>
        <Text>
          Flow with the serenity of Annecy lake in a rejuvenating Vinyasa yoga
          class, harmonizing breath and movement amidst breathtaking natural
          beauty.
        </Text>
      </Stack>
    </CardBody>
  </Card>
);

const SessionCardBoard = () => (
  <SimpleGrid
    spacing={4}
    templateColumns="repeat(auto-fill, minmax(400px, 2fr))"
    padding="30px"
  >
    <SessionCard />
    <SessionCard />
    <SessionCard />
    <SessionCard />
    <SessionCard />
    <SessionCard />
    <SessionCard />
    <SessionCard />
    <SessionCard />
  </SimpleGrid>
);

export default SessionCardBoard;
