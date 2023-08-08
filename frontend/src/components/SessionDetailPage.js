import { Heading, Text, Box, Image, Button } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { customFetch } from "../utils/customFetch";
import React, { useState, useEffect } from "react";
import PageContainer from "./PageContainer";

const SessionDetailPage = () => {
  const { sessionId } = useParams();
  const [session, setSession] = useState({});

  const fetchSessionData = () => {
    customFetch
      .get(`/api/sessions/${sessionId}`)
      .then((res) => setSession(res.data))
      .catch((err) => console.log(err));
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

        <Button mt={4} background="#A2EAC3" _hover={{ bg: "#6DB990" }}>
          Book
        </Button>
      </Box>
    </>
  );

  const notFound = () => <Text align={"center"}>Not Found</Text>;
  return <PageContainer>{session ? detailPage() : notFound()}</PageContainer>;
};

export default SessionDetailPage;
