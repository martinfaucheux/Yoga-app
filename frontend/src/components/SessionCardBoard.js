import {
  ButtonGroup,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  SimpleGrid,
  Box,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import axios from "axios";

const SessionCard = ({ name, description }) => {
  return (
    <Card
      maxW="md"
      _hover={{ transform: "scale(1.02)" }} // Scaling effect on hover
      transition="transform 0.3s ease" // Smooth transition on hover
    >
      <Box>
        <Image
          src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1220&q=80"
          alt="Woman doing yoga"
          borderRadius="lg"
          objectPosition="center -30px" // Adjust this value to reposition the image
        />
        <CardBody>
          <Box
            position="absolute"
            bottom="0"
            left="0"
            width="100%"
            p="4"
            borderBottomRadius="lg"
            // background="white"
            backgroundImage="linear-gradient(transparent 5%, white 10%)"
          >
            <Heading size="md">{name}</Heading>
            <Text>{description}</Text>
          </Box>
        </CardBody>
      </Box>
    </Card>
  );
};

const SessionCardBoard = () => {
  const [sessionList, setSessionList] = useState([]);

  const fetchUserData = () => {
    axios
      .get("/api/sessions/")
      .then((res) => setSessionList(res.data))
      .catch((err) => console.log(err));
  };

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    fetchUserData();
  }, []);

  console.log(sessionList);

  return (
    <>
      <SimpleGrid
        spacing={10}
        templateColumns="repeat(auto-fill, minmax(400px, 2fr))"
        padding="30px"
        justifyItems="center" // Center items horizontally
      >
        {sessionList.map((session) => (
          <SessionCard
            key={session.id}
            name={session.name}
            description={session.description}
          />
        ))}
      </SimpleGrid>
      <Image
        src="https://images.unsplash.com/photo-1617173945092-1c6622e5b651?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80"
        alt="Unsplash Image"
        position="fixed"
        bottom="0"
        right="0"
        opacity="0.5"
        zIndex="-1"
        width="28%"
      />
    </>
  );
};

export default SessionCardBoard;
