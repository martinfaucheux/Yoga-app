import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import {
  Box,
  VStack,
  Image,
  Heading,
  Text,
  Center,
  Button,
  Flex,
} from "@chakra-ui/react";
import "./Calendar.css";
import { customFetch } from "../utils/customFetch";

function CalendarView() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [sessionList, setSessionList] = useState([]);
  const [dateList, setDateList] = useState([]);

  const fetchSessionData = async () => {
    try {
      const response = await customFetch.get("/api/sessions/");
      setSessionList(response.data);
      setDateList(
        response.data.map((row) => new Date(row.start_at).toDateString())
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSessionData();
  }, []);

  // console.log(dateList);

  const CalendarTile = ({ activeStartDate, date, view }) => {
    if (view === "month") {
      const formattedDate = date.toDateString();
      const markDate = dateList.includes(formattedDate);
      return <Circle size={2} transparent={markDate} />;
    }
  };

  return (
    <Flex
      direction={{ md: "column", xl: "row" }}
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
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

          <Text>Selected Date: {selectedDate.toDateString()}</Text>
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
  const [isBooked, setIsBooked] = useState(false);
  const session = {
    picture_url:
      "https://images.unsplash.com/photo-1603988363607-e1e4a66962c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    name: "Yoga class",
    duration: 60,
    description: "Some class that is great for you",
    start_at: Date(2023, 8, 22, 19, 0, 0, 0),
  };

  const bookSession = () => {};
  const cancelSession = () => {};

  return (
    <Box>
      {/* <Image
        src={session.picture_url}
        alt={session.name}
        maxH="300px"
        objectFit="cover"
        borderRadius="lg"
      /> */}

      <Box p={4}>
        <Heading size="lg">{session.name}</Heading>
        <Text mt={2} color="gray.500">
          {new Date(session.start_at).toLocaleDateString()} | {session.duration}{" "}
          minutes
        </Text>
        <Text mt={4}>{session.description}</Text>

        {/* {isBooked ? (
          <>
            <Text mt={4} color="gray.500">
              you already booked this session
            </Text>
            <Button mt={4} colorScheme="sunset" onClick={cancelSession}>
              Cancel Booking
            </Button>
          </>
        ) : (
          <Button mt={4} colorScheme="emerald" onClick={bookSession}>
            Book
          </Button>
        )} */}
      </Box>
    </Box>
  );
};

export default CalendarView;
