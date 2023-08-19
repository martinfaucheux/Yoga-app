import { Heading, Text, Box, Image, Button } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { customFetch } from "../utils/customFetch";
import React, { useState, useEffect } from "react";
import PageContainer from "./PageContainer";

const SessionDetailPage = () => {
  const { sessionId } = useParams();
  const [session, setSession] = useState({});
  const [isBooked, setIsBooked] = useState(false);

  const fetchSessionData = async () => {
    try {
      const response = await customFetch.get(`/api/sessions/${sessionId}/`);
      setSession(response.data);
      setIsBooked(!!response.data.booking);
    } catch (error) {
      console.log(error);
    }
  };

  const bookSession = async () => {
    try {
      await customFetch.post("/api/bookings/", {
        session: sessionId,
      });
      // setIsBooked(true);
      await fetchSessionData();
    } catch (error) {
      console.log(error);
    }
  };

  const cancelSession = async () => {
    try {
      await customFetch.delete(`/api/bookings/${session.booking}`);
      // setIsBooked(false);
      await fetchSessionData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSessionData();
  }, []);

  const detailPage = () => (
    <>
      <Image
        src={session.picture_url}
        alt={session.name}
        maxH="300px"
        objectFit="cover"
        borderRadius="lg"
      />

      <Box p={4}>
        <Heading size="lg">{session.name}</Heading>
        <Text mt={2} color="gray.500">
          {new Date(session.start_at).toLocaleDateString()} | {session.duration}{" "}
          minutes
        </Text>
        <Text mt={4}>{session.description}</Text>

        {isBooked ? (
          <>
            <Text mt={4} color="gray.500">
              you already booked this session
            </Text>
            <Button
              mt={4}
              background="#F5A55F"
              _hover={{ bg: "#a67850" }}
              onClick={cancelSession}
            >
              Cancel Booking
            </Button>
          </>
        ) : (
          <Button
            mt={4}
            background="#A2EAC3"
            _hover={{ bg: "#c48651" }}
            onClick={bookSession}
          >
            Book
          </Button>
        )}
      </Box>
    </>
  );

  const notFound = () => <Text align={"center"}>Not Found</Text>;
  return <PageContainer>{session ? detailPage() : notFound()}</PageContainer>;
};

export default SessionDetailPage;
