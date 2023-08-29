import {
  Flex,
  Text,
  Button,
  HStack,
  Spacer,
  Box,
  Tooltip,
  Tag,
  Center,
} from "@chakra-ui/react";
import { customFetch } from "../utils/customFetch";

const defaultTimeformat = (date) => date.toLocaleString();

const BookingStateBadge = ({ booking }) => {
  if (!booking) {
    return null;
  }
  const tagProps = { size: "lg", mx: "5" };
  return booking.is_confirmed ? (
    <Tooltip label="Your booking has been confirmed by the teacher">
      <Tag colorScheme="emerald" {...tagProps}>
        Confirmed
      </Tag>
    </Tooltip>
  ) : (
    <Tooltip label="Your booking is not yet confirmed. Check your emails for update">
      <Tag colorScheme="blue" {...tagProps}>
        <Text>Pending</Text>
      </Tag>
    </Tooltip>
  );
};

const SessionCard = ({
  session,
  booking,
  refreshList,
  showBookText = false,
  formatDate = defaultTimeformat,
}) => {
  const bookSession = async () => {
    try {
      await customFetch.post("/api/bookings/", {
        session: session.id,
      });
      await refreshList();
    } catch (error) {
      // TODO: do better
      console.log(error);
    }
  };

  const cancelBooking = async () => {
    try {
      await customFetch.delete(`/api/bookings/${booking.id}`);
      await refreshList();
    } catch (error) {
      // TODO: do better
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
          <HStack ml="2" spacing="4">
            <Text>{formatDate(new Date(session.start_at))}</Text>
            {showBookText && !!booking ? (
              <Text color="gray.400">Already booked</Text>
            ) : null}
          </HStack>
        </Center>
        <Spacer />
        <BookingStateBadge booking={booking} />

        {!!booking ? (
          <Button colorScheme="sunset" px={5} onClick={cancelBooking}>
            Cancel booking
          </Button>
        ) : (
          <Button colorScheme="emerald" px={5} onClick={bookSession}>
            Book Now!
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default SessionCard;
