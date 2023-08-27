import { useState } from "react";
import Calendar from "react-calendar";
import {
  Box,
  VStack,
  Container,
  Heading,
  Text,
  Center,
} from "@chakra-ui/react";
import "./Calendar.css";

function CalendarView() {
  const [date, setDate] = useState(new Date());

  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
    >
      <VStack spacing={5}>
        <Heading>React Calendar</Heading>
        <Box
          boxShadow={{ base: "none", sm: "md" }}
          borderRadius={{ base: "none", sm: "md" }}
        >
          <Box
            as={Calendar}
            onChange={setDate}
            value={date}
            selectRange={false}
            tileContent={CalendarTile}
          />
        </Box>
        <Text>Selected Date: {date.toDateString()}</Text>
      </VStack>
    </Container>
  );
}

const CalendarTile = ({ activeStartDate, date, view }) => {
  const isDate = date.getDay() === 2;
  return <Circle size={2} transparent={isDate} />;
};

const Circle = ({ size, transparent }) => {
  return (
    <Center>
      <Box
        mt={2}
        w={size}
        h={size}
        borderRadius="50%"
        bg={transparent ? "emerald.500" : `rgba(0, 0 0, 0)`}
      />
    </Center>
  );
};

export default CalendarView;
