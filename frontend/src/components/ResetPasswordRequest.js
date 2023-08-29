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

const RestPasswordForm = ({ setSuccesfullySubmitted }) => {
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const [apiError, setApiError] = useState("");

  const handleSubmit = async () => {
    try {
      setAlreadySubmitted(true);
      await customFetch.post("/api/users/request_reset_password/", {
        email: emailAddress,
      });
      setSuccesfullySubmitted(true);
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
    <>
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
        <FormErrorMessage>This is not a valid email</FormErrorMessage>
      </FormControl>
      <Button colorScheme="emerald" onClick={handleSubmit}>
        Send reset email
      </Button>
      {!!apiError ? (
        <Alert status="error" borderRadius={"md"}>
          <AlertIcon />
          An unexpected error occurred while reseting your password...
        </Alert>
      ) : null}
    </>
  );
};

const ResetPasswordRequest = () => {
  const [succesfullySubmitted, setSuccesfullySubmitted] = useState(false);

  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "1", sm: "8" }}
    >
      <Stack spacing={5}>
        <Heading>Reset your password</Heading>
        {succesfullySubmitted ? (
          <Text>
            Password reset request succesfully submitted, check your emails!
          </Text>
        ) : (
          <RestPasswordForm setSuccesfullySubmitted={setSuccesfullySubmitted} />
        )}
      </Stack>
    </Container>
  );
};

export default ResetPasswordRequest;
