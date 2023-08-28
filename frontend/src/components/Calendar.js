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

  return (
    <Flex
      direction={{ base: "column", md: "column", xl: "row" }}
      py={{ base: "12", md: "24" }}
      px={{ base: "1", sm: "8" }}
    >
      <Box flex={1}>
        <DummaySession />
      </Box>
      <Box flex={1}>
        <VStack spacing={5}>
          <Heading>React Calendar</Heading>
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

          <VStack align="stretch" spacing={5} maxW="600px" w="100%">
            {(sessionMap[selectedDate.toDateString()] || []).map((session) => (
              <SessionCard id={session.id} session={session} />
            ))}
          </VStack>
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

const DummaySession = () => {
  const session = {
    picture_url:
      "https://images.unsplash.com/photo-1603988363607-e1e4a66962c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    name: "Yoga class",
    duration: 60,
    description: "Some class that is great for you",
    start_at: Date(2023, 8, 22, 19, 0, 0, 0),
  };

  return (
    <Box>
      <Box p={4}>
        <Heading size="lg">{session.name}</Heading>
        <Text mt={2} color="gray.500">
          {new Date(session.start_at).toLocaleDateString()} | {session.duration}{" "}
          minutes
        </Text>
        <Text mt={4}>{session.description}</Text>
      </Box>
    </Box>
  );
};

export default CalendarView;
