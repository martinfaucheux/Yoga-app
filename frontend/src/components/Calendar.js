import { useState } from "react";
import Calendar from "react-calendar";
import { Box, VStack, Container, Heading, Text } from "@chakra-ui/react";
import "./Calendar.css";

function CalendarView() {
  const [date, setDate] = useState(new Date());

  return (
    <Container
      className="app"
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
    >
      <VStack spacing={5}>
        <Heading>React Calendar</Heading>
        <Box className="calendar-container">
          <Calendar onChange={setDate} value={date} />
        </Box>
        <Text>Selected Date: {date.toDateString()}</Text>
      </VStack>
    </Container>
  );
}
export default CalendarView;
