import { Container, Heading, Text, Alert, AlertIcon } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { customFetch } from "../utils/customFetch";

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

  return (
    <Container>
      <Heading>Verify your email</Heading>
      <Text>
        {isVerified ? "Your email is verified, you can now login" : "Verifying"}
      </Text>
      {errorMessage !== "" ? (
        <Alert status="error" borderRadius={"md"}>
          <AlertIcon />
          {errorMessage}
        </Alert>
      ) : null}
    </Container>
  );
};

export default EmailVerification;
