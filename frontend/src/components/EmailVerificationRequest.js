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
  const [apiError, setApiError] = useState("");

  const handleSubmit = async () => {
    try {
      await customFetch.post("/api/users/request_email_verification/");
      setSuccesfullySubmitted(true);
    } catch (error) {
      setApiError("An error occurred");
    }
  };

  return (
    <>
      <Text>
        We need to verify your account before you start using Yogine features.
        Click the button below and we'll send you a verification email.
      </Text>
      <Button colorScheme="emerald" onClick={handleSubmit}>
        Send verification email
      </Button>
      {!!apiError ? (
        <Alert status="error" borderRadius={"md"}>
          <AlertIcon />
          An unexpected error occurred while sending the email...
        </Alert>
      ) : null}
    </>
  );
};

const EmailVerificationRequest = () => {
  const [succesfullySubmitted, setSuccesfullySubmitted] = useState(false);

  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "1", sm: "8" }}
    >
      <Stack spacing={5}>
        <Heading>Verify your email</Heading>
        {succesfullySubmitted ? (
          <Text>
            Verification request succesfully submitted, check your emails!
          </Text>
        ) : (
          <RestPasswordForm setSuccesfullySubmitted={setSuccesfullySubmitted} />
        )}
      </Stack>
    </Container>
  );
};

export default EmailVerificationRequest;
