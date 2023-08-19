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
import { useNavigate, useSearchParams } from "react-router-dom";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const [token] = useState(searchParams.get("token"));

  const isPasswordInvalid = formData.password === "";
  const isConfirmPasswordInvalid =
    formData.confirmPassword === "" &&
    formData.password !== formData.confirmPassword;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setAlreadySubmitted(true);

    try {
      await customFetch.post("/api/users/reset_password/", {
        token: token,
        password: formData.password,
      });
      setErrorMessage("");
      navigate("/login", {
        state: { passedMessage: "Your password has been reset." },
      });
    } catch (error) {
      setErrorMessage("An unexpected error occurred while signing in...");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
    >
      <Stack spacing={5}>
        <Heading>Reset password</Heading>
        {!!token ? (
          <>
            <Text>Type in your new password</Text>
            <FormControl isInvalid={alreadySubmitted && isPasswordInvalid}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <FormErrorMessage>{"Password is required"}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={alreadySubmitted && isConfirmPasswordInvalid}
            >
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
              />
              <FormErrorMessage>{"Both passwords must match"}</FormErrorMessage>
            </FormControl>
            <Button
              onClick={handleSubmit}
              background="#A2EAC3"
              _hover={{ bg: "#6DB990" }}
            >
              Reset password
            </Button>
            {!!errorMessage ? (
              <Alert status="error" borderRadius={"md"}>
                <AlertIcon />
                An unexpected error occurred while reseting your password...
              </Alert>
            ) : null}
          </>
        ) : (
          <Alert status="error" borderRadius={"md"}>
            <AlertIcon />
            Invalid reset password token.
          </Alert>
        )}
      </Stack>
    </Container>
  );
};

export default ResetPassword;
