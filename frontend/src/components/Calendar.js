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
  Spacer,
} from "@chakra-ui/react";
import "./Calendar.css";
import { customFetch } from "../utils/customFetch";
import SessionDescription from "./SessionDescription";

const formatHours = (date) => {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

const SessionCard = ({ session }) => {
  return (
    <Box
      borderRadius={"xl"}
      borderColor="gray.200"
      borderWidth={1}
      p={4}
      bg="white"
    >
      <Flex direction="row">
        <Center>
          <Text ml={2}>
            Book session at {formatHours(new Date(session.start_at))}
          </Text>
        </Center>
        <Spacer />
        <Button colorScheme="emerald" px={5}>
          Book
        </Button>
      </Flex>
    </Box>
  );
};

function CalendarView() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [sessionMap, setSessionMap] = useState([]);

  const fetchSessionData = async () => {
    try {
      const response = await customFetch.get("/api/sessions/");
      let _sessionMap = {};

      // Iterate through the list of objects
      response.data.forEach((obj) => {
        // Get the date representation as a string (YYYY-MM-DD)
        const dateKey = new Date(obj.start_at).toDateString();

        // Check if the dateKey already exists in the dictionary
        if (_sessionMap[dateKey]) {
          // If it exists, push the object to the existing list
          _sessionMap[dateKey].push(obj);
        } else {
          // If it doesn't exist, create a new list with the object
          _sessionMap[dateKey] = [obj];
        }
      });
      setSessionMap(_sessionMap);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSessionData();
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
            <VStack align="stretch" spacing={5} maxW="600px" w="100%">
              {selectedSessions.map((session) => (
                <SessionCard id={session.id} session={session} />
              ))}
            </VStack>
          ) : (
            <Text fontSize="xl" mt={5} color="gray.400">
              No session on the selected day
            </Text>
          )}
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
