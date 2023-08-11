import { Container, Heading, Text } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";

const EmailVerification = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("token");

  return (
    <Container>
      <Heading>Verify your email</Heading>
      <Text>Your code is {token}</Text>
    </Container>
  );
};

export default EmailVerification;
