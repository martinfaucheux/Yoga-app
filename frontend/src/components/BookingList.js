import { Container, Heading, Text, Button, VStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { customFetch } from "../utils/customFetch";
import { Link } from "react-router-dom";
import SessionCard from "./SessionCard";

const BookingList = () => {
  const [sessionList, setSessionList] = useState([]);
  const [bookingList, setBookingList] = useState([]);

  const sessionMap = sessionList.reduce((acc, obj) => {
    acc[obj.id] = obj;
    return acc;
  }, {});

  const fetchSessions = async () => {
    try {
      const response = await customFetch.get("/api/sessions/");
      setSessionList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await customFetch.get("/api/bookings/");
      setBookingList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSessions();
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
        {bookingList.length ? (
          <>
            {bookingList.map((booking) => {
              const session = sessionMap[booking.session];
              return !!session ? (
                <SessionCard
                  key={booking.id}
                  session={session}
                  booking={booking}
                  refreshList={fetchBookings}
                />
              ) : null;
            })}
          </>
        ) : (
          <Text color="gray.400">You haven't booked any session yet.</Text>
        )}
      </VStack>
    </Container>
  );
};

export default BookingList;
