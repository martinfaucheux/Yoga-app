import {
  Container,
  Heading,
  Text,
  VStack,
  Tabs,
  TabList,
  Tab,
} from "@chakra-ui/react";

import { useState, useEffect } from "react";
import { customFetch } from "../utils/customFetch";
import SessionCard from "./SessionCard";
import { useErrorToast } from "./Toast";
import { capitalize } from "../utils/Format";

const TAB_NAMES = ["pending", "confirmed", "canceled"];

const buildIdMap = (_list) =>
  _list.reduce((acc, obj) => {
    acc[obj.id] = obj;
    return acc;
  }, {});

const TeacherBookingList = () => {
  const [sessionList, setSessionList] = useState([]);
  const [bookingList, setBookingList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [tabName, setTabName] = useState("pending");
  const toast = useErrorToast();

  const sessionMap = buildIdMap(sessionList);
  const userMap = buildIdMap(userList);

  const fetchSessions = async () => {
    try {
      const response = await customFetch.get("/api/sessions/", {
        params: { upcoming: true },
      });
      setSessionList(response.data);
    } catch (error) {
      toast();
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await customFetch.get("/api/bookings/all/", {
        params: { upcoming: true, status: tabName },
      });
      setBookingList(response.data);
    } catch (error) {
      toast();
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await customFetch.get("/api/users/");
      setUserList(response.data);
    } catch (error) {
      toast();
    }
  };

  useEffect(() => {
    fetchSessions();
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [tabName]);

  return (
    <Container
      maxW="4xl"
      py={{ base: "12", md: "24" }}
      px={{ base: "1", sm: "8" }}
    >
      <VStack spacing={8} align="stretch">
        <Heading>Booking list</Heading>
        <Text>Here are the sessions booked by the students.</Text>

        <Tabs
          colorScheme="emerald"
          isFitted
          onChange={(index) => setTabName(TAB_NAMES[index])}
        >
          <VStack spacing={8} align="stretch">
            <TabList>
              {TAB_NAMES.map((tabName) => (
                <Tab>{capitalize(tabName)}</Tab>
              ))}
            </TabList>
            {bookingList.length ? (
              <>
                {bookingList.map((booking) => {
                  const session = sessionMap[booking.session];
                  return !!session ? (
                    <SessionCard
                      key={booking.id}
                      session={session}
                      booking={booking}
                      user={userMap[booking.user]}
                      refreshList={fetchBookings}
                      buttonType="teacher"
                    />
                  ) : null;
                })}
              </>
            ) : (
              <Text color="gray.400" fontSize="xl" align="center" mt="10">
                No {tabName} booking
              </Text>
            )}
          </VStack>
        </Tabs>
      </VStack>
    </Container>
  );
};

export default TeacherBookingList;
