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
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { customFetch } from "../utils/customFetch";
import { useErrorToast } from "./Toast";
import { useRef } from "react";

const defaultTimeformat = (date) => date.toLocaleString();

const BookingStateBadge = ({ booking }) => {
  const toast = useErrorToast();
  if (!booking) {
    return null;
  }
  const tagProps = { size: "lg", mx: "5" };
  switch (booking.status) {
    case "confirmed":
      return (
        <Tooltip label="Your booking has been confirmed by the teacher">
          <Tag colorScheme="emerald" {...tagProps}>
            Confirmed
          </Tag>
        </Tooltip>
      );
    case "pending":
      return (
        <Tooltip label="Your booking is not yet confirmed. Check your emails for update">
          <Tag colorScheme="blue" {...tagProps}>
            <Text>Pending</Text>
          </Tag>
        </Tooltip>
      );
    case "canceled":
      return (
        <Tooltip label="There are no slot available so your booking has been canceled.">
          <Tag colorScheme="sunset" {...tagProps}>
            <Text>Canceled</Text>
          </Tag>
        </Tooltip>
      );
    default:
      toast();
      break;
  }
};

const ConfirmActionModal = ({
  onClose,
  isOpen,
  cancelRef,
  onConfirm,
  header,
  children,
}) => {
  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>{header}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{children}</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button
              colorScheme="sunset"
              ml={3}
              onClick={() => {
                onConfirm();
                onClose();
              }}
            >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

const BookButton = ({ session, booking, onClick }) => {
  const isPassed = new Date(session.start_at) < new Date();

  let button = !!booking ? (
    <Button
      colorScheme="sunset"
      px={5}
      onClick={onClick}
      isDisabled={booking.status === "canceled" || isPassed}
    >
      Cancel booking
    </Button>
  ) : (
    <Button
      colorScheme="emerald"
      px={5}
      onClick={onClick}
      isDisabled={isPassed}
    >
      Book Now!
    </Button>
  );

  if (isPassed) {
    button = <Tooltip label="This session is passed">{button}</Tooltip>;
  }

  return button;
};

const TeacherButton = ({ booking, updateStatus }) => {
  if (booking.status === "confirmed") {
    return (
      <Button
        colorScheme="sunset"
        px={5}
        onClick={() => updateStatus("canceled")}
      >
        Deny
      </Button>
    );
  } else if (booking.status === "canceled") {
    return (
      <Button
        colorScheme="emerald"
        px={5}
        onClick={() => updateStatus("confirmed")}
      >
        Confirm
      </Button>
    );
  }
  return null;
};

const SessionCard = ({
  session,
  booking,
  refreshList,
  user = null,
  showBookText = false,
  buttonType = "book",
  formatDate = defaultTimeformat,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const toast = useErrorToast();

  const bookSession = async () => {
    try {
      await customFetch.post("/api/bookings/", {
        session: session.id,
      });
      await refreshList();
    } catch (error) {
      toast();
    }
  };

  const cancelBooking = async () => {
    try {
      await customFetch.delete(`/api/bookings/${booking.id}`);
      await refreshList();
    } catch (error) {
      toast();
    }
  };

  const updateStatus = async (status) => {
    try {
      await customFetch.post(`/api/bookings/${booking.id}/update_status/`, {
        status,
      });
      await refreshList();
    } catch (error) {
      toast();
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
            {!!user ? (
              <Text ml="10">{`${user.first_name} ${user.last_name}`}</Text>
            ) : null}
          </HStack>
        </Center>
        <Spacer />
        <BookingStateBadge booking={booking} />
        {(
          buttonType === "book" ? (
            <BookButton session={session} booking={booking} onClick={onOpen} />
          ) : (
            buttonType === "teacher"
          )
        ) ? (
          <TeacherButton booking={booking} updateStatus={updateStatus} />
        ) : null}
      </Flex>
      <ConfirmActionModal
        onClose={onClose}
        isOpen={isOpen}
        cancelRef={cancelRef}
        onConfirm={!!booking ? cancelBooking : bookSession}
        header={!!booking ? "Cancel you booking" : "Confirm you booking"}
      >
        {!!booking ? (
          <Text>Are you sure you want to cancel your booking?</Text>
        ) : (
          <Text>
            Do you want to book this session? An email will be sent to your
            address once your booking is confirmed.
          </Text>
        )}
        <Text mt="2">
          Session: {new Date(session.start_at).toLocaleDateString()}
        </Text>
      </ConfirmActionModal>
    </Box>
  );
};

export default SessionCard;
