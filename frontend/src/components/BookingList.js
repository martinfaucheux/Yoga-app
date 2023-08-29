import {
  Container,
  Heading,
  Flex,
  Text,
  Button,
  Spacer,
  Box,
  Center,
  VStack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { customFetch } from "../utils/customFetch";
import { Link } from "react-router-dom";

const SessionCard = ({ session, refreshList }) => {
  const cancelBooking = async () => {
    try {
      await customFetch.delete(`/api/bookings/${session.booking}`);
      await refreshList();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      borderRadius={"xl"}
      borderColor="gray.200"
      borderWidth={1}
      p={4}
      bg="white"
    >
      <Flex direction="row" spacing={2}>
        <Center>
          <Text>{new Date(session.start_at).toLocaleString()}</Text>
        </Center>
        <Spacer />
        <Button colorScheme="sunset" px={5} onClick={cancelBooking}>
          Cancel booking
        </Button>
      </Flex>
    </Box>
  );
};

const BookingList = () => {
  const [sessionList, setSessionList] = useState([]);

  const fetchBookings = async () => {
    try {
      const response = await customFetch.get("/api/bookings/me/");
      setSessionList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <Container
      maxW="4xl"
      py={{ base: "12", md: "24" }}
      px={{ base: "1", sm: "8" }}
    >
      <VStack spacing={8} align="stretch">
        <Heading>Booking list</Heading>
        <Text>
          Here is the list of your booked sessions. See other available sessions
          <Button colorScheme="emerald" variant="link" as={Link} to="/sessions">
            here
          </Button>
          .
        </Text>
        {sessionList.length ? (
          <>
            {sessionList.map((session) => (
              <SessionCard
                key={session.booking}
                session={session}
                refreshList={fetchBookings}
              />
            ))}
          </>
        ) : (
          <Text color="gray.400">You haven't booked any session yet.</Text>
        )}
      </VStack>
    </Container>
  );
};

export default BookingList;
