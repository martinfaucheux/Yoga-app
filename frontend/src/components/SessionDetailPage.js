import { Heading, Text, Box, Image, Button } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";

const SessionDetailPage = () => {
  const { sessionId } = useParams();
  const [session, setSession] = useState({});

  const fetchSessionData = () => {
    axios
      .get(`/api/sessions/${sessionId}`)
      .then((res) => setSession(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchSessionData();
  }, []);

  return session ? (
    <Box p={4} borderWidth="1px" borderRadius="lg" overflow="hidden">
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

        <Button mt={4} background="#A2EAC3" _hover={{ bg: "#6DB990" }}>
          Book
        </Button>
      </Box>
    </Box>
  ) : (
    <Text align={"center"}>Not Found</Text>
  );
};

export default SessionDetailPage;
