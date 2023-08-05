import {
  Card,
  CardBody,
  SimpleGrid,
  Box,
  Heading,
  Image,
  Icon,
  Flex,
  Text,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { TimeIcon } from "@chakra-ui/icons";

const SessionCard = ({ name, description, picture_url, duration }) => {
  picture_url = picture_url
    ? picture_url
    : "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1220&q=80";
  return (
    <Card
      maxW="xl"
      _hover={{ transform: "scale(1.02)" }} // Scaling effect on hover
      transition="transform 0.3s ease" // Smooth transition on hover
    >
      <Box>
        <Image
          src={picture_url}
          alt="Woman doing yoga"
          borderRadius="lg"
          objectPosition="center -30px"
          height="350px" // Adjust this value to change the image height
          objectFit="cover" // Maintain aspect ratio and cover the space
        />
        <CardBody>
          <Box
            position="absolute"
            bottom="0"
            left="0"
            width="100%"
            p="4"
            borderBottomRadius="lg"
            background="white"
          >
            <Heading size="md">{name}</Heading>
            <Text>{description}</Text>
            <Flex mt={2} align="center">
              <Icon as={TimeIcon} mr={2} />
              <Text>{duration} mins</Text>
            </Flex>
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
        columns={{ base: 1, md: 2, lg: 3 }} // Responsive column count
        spacing={10}
        padding="30px"
        justifyItems="center"
      >
        {sessionList.map((session) => (
          <SessionCard
            key={session.id}
            name={session.name}
            description={session.description}
            picture_url={session.picture_url}
            duration={session.duration}
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