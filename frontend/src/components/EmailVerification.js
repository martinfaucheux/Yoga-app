import {
  Container,
  Heading,
  Text,
  Alert,
  AlertIcon,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { customFetch } from "../utils/customFetch";
import { Link } from "react-router-dom";

const EmailVerification = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isVerified, setIsVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const verifyToken = async () => {
    const token = searchParams.get("token");
    try {
      await customFetch.post("/api/users/verify/", { token: token });
      setIsVerified(true);
    } catch (error) {
      setErrorMessage("Invalid verification token");
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  const displayError = () => (
    <>
      <Alert status="error" borderRadius={"md"} mt={5}>
        <AlertIcon />
        {errorMessage}
      </Alert>
    </>
  );

  const displayText = () => (
    <Text mt={5}>
      {isVerified ? (
        <>
          Your email is verified, you can now{" "}
          <ChakraLink
            to="/login"
            as={Link}
            color="#6DB990"
            style={{ fontWeight: "bold" }}
          >
            login
          </ChakraLink>
        </>
      ) : (
        "Verifying"
      )}
    </Text>
  );

  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
    >
      <Heading mt={5}>Verify your email</Heading>

      {errorMessage === "" ? displayText() : displayError()}
    </Container>
  );
};

export default EmailVerification;
