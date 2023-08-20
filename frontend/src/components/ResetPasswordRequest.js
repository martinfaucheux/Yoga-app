import {
  Container,
  Heading,
  Text,
  Input,
  Alert,
  FormLabel,
  FormControl,
  FormErrorMessage,
  Button,
  AlertIcon,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { customFetch } from "../utils/customFetch";

const ResetPasswordRequest = () => {
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const [apiError, setApiError] = useState("");

  const handleSubmit = async () => {
    try {
      setAlreadySubmitted(true);
      await customFetch.post("/api/users/request_reset_password/", {
        email: emailAddress,
      });
    } catch (error) {
      setApiError("An error occurred");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const isEmailInvalid = () => {
    return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress);
  };

  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
    >
      <Stack spacing={5}>
        <Heading>Reset your password</Heading>
        <Text>
          Type the email you used to sign up on Yogine and we'll send you a
          password reset email.
        </Text>
        <FormControl isInvalid={alreadySubmitted && isEmailInvalid()}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            value={emailAddress}
            onChange={(event) => setEmailAddress(event.target.value)}
            onKeyDown={handleKeyPress}
          />
          <FormErrorMessage>{"This is not a valid email"}</FormErrorMessage>
        </FormControl>
        <Button
          onClick={handleSubmit}
          background="#A2EAC3"
          _hover={{ bg: "#6DB990" }}
        >
          Send reset link
        </Button>
        {!!apiError ? (
          <Alert status="error" borderRadius={"md"}>
            <AlertIcon />
            An unexpected error occurred while reseting your password...
          </Alert>
        ) : null}
      </Stack>
    </Container>
  );
};

export default ResetPasswordRequest;