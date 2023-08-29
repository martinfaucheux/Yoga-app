import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import {
  Box,
  VStack,
  Heading,
  Text,
  Center,
  Flex,
  Button,
} from "@chakra-ui/react";
import "./Calendar.css";
import { customFetch } from "../utils/customFetch";
import SessionDescription from "./SessionDescription";
import { Link } from "react-router-dom";
import SessionCard from "./SessionCard";

function CalendarView() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [sessionMap, setSessionMap] = useState({});
  const [bookingMap, setBookingMap] = useState({});

  const fetchSessionData = async () => {
    try {
      const response = await customFetch.get("/api/sessions/");
      let _sessionMap = {};
      response.data.forEach((obj) => {
        const dateKey = new Date(obj.start_at).toDateString();
        if (_sessionMap[dateKey]) {
          _sessionMap[dateKey].push(obj);
        } else {
          _sessionMap[dateKey] = [obj];
        }
      });
      setSessionMap(_sessionMap);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchBookingData = async () => {
    try {
      const response = await customFetch.get("/api/bookings/");
      let _bookingMap = {};
      response.data.forEach((obj) => {
        _bookingMap[obj.session] = obj;
      });
      setBookingMap(_bookingMap);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSessionData();
    fetchBookingData();
  }, []);

  const CalendarTile = ({ activeStartDate, date, view }) => {
    if (view === "month") {
      const formattedDate = date.toDateString();
      const markDate = formattedDate in sessionMap;
      return <Circle size={2} transparent={markDate} />;
    }
  };

  const selectedSessions = sessionMap[selectedDate.toDateString()] || [];

  return (
    <Flex
      direction={{ base: "column", md: "column", xl: "row" }}
      py={{ base: "12", md: "24" }}
      px={{ base: "1", sm: "8" }}
    >
      <Box flex={1}>
        <SessionDescription />
      </Box>
      <Box flex={1}>
        <VStack spacing={5}>
          <Heading>Book your session</Heading>
          <Box
            boxShadow={{ base: "none", sm: "md" }}
            borderRadius={{ base: "none", sm: "md" }}
          >
            <Box
              maxW="600px"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box
                p={2}
                as={Calendar}
                onChange={setSelectedDate}
                value={selectedDate}
                selectRange={false}
                tileContent={CalendarTile}
              />
            </Box>
          </Box>

          {selectedSessions.length ? (
            <>
              <Text>Available sessions</Text>
              <VStack align="stretch" spacing={5} maxW="600px" w="100%">
                {selectedSessions.map((session) => {
                  const booking = bookingMap[session.id];
                  return (
                    <SessionCard
                      key={`${session.id}-${booking?.id}`}
                      session={session}
                      booking={booking}
                      refreshList={fetchBookingData}
                      showBookText={true}
                      formatDate={(date) => date.toLocaleTimeString()}
                    />
                  );
                })}
              </VStack>
            </>
          ) : (
            <Text fontSize="xl" mt={5} color="gray.400">
              No session on the selected day
            </Text>
          )}
          <Text>
            You can see your booking list
            <Button
              colorScheme="emerald"
              variant="link"
              as={Link}
              to="/bookings"
            >
              here
            </Button>
            .
          </Text>
        </VStack>
      </Box>
    </Flex>
  );
}

const Circle = ({ size, transparent }) => {
  return (
    <Center>
      <Box
        mt={2}
        w={size}
        h={size}
        borderRadius="50%"
        bg={transparent ? "sunset.300" : `rgba(0, 0 0, 0)`}
      />
    </Center>
  );
};

export default CalendarView;
