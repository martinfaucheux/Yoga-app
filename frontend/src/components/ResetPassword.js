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
} from "@chakra-ui/react";
import { useState } from "react";
import { customFetch } from "../utils/customFetch";

const ResetPassword = () => {
  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
    >
      <Heading mt={5}>Reset password</Heading>
      <Text>Reset your password here</Text>
      {/* <FormControl isInvalid={alreadySubmitted && isEmailInvalid()}>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.value)}
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
      ) : null}*/}
    </Container>
  );
};

export default ResetPassword;
