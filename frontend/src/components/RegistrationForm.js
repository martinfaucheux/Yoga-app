import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  Stack,
  Box,
  Center,
  Heading,
  Text,
  Alert,
  AlertIcon,
  Flex,
} from "@chakra-ui/react";
import { customFetch } from "../utils/customFetch";
import { useNavigate } from "react-router-dom";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [signUpError, setSignUpError] = useState(false);
  const navigate = useNavigate();

  const isFirstNameInvalid = formData.firstName === "";
  const isLastNameInvalid = formData.lastName === "";
  const isEmailInvalid = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

  const isPasswordInvalid = formData.password === "";
  const isConfirmPasswordInvalid =
    formData.confirmPassword === "" &&
    formData.password != formData.confirmPassword;

  const disableButton =
    isFirstNameInvalid ||
    isLastNameInvalid ||
    isEmailInvalid ||
    isPasswordInvalid ||
    isConfirmPasswordInvalid;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setAlreadySubmitted(true);
    if (disableButton) {
      return;
    }

    const postData = {
      email: formData.email,
      password: formData.password,
      first_name: formData.firstName,
      last_name: formData.lastName,
    };
    try {
      await customFetch.post("/api/users/", postData);
      setSignUpError(false);
      navigate("/login", { state: { successfulSignUp: true } });
    } catch (error) {
      setSignUpError(true);
    }
    console.log(formData);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      mt={{ md: 0, xl: 100 }}
      direction={{ md: "column", xl: "row" }}
    >
      <Box flex={1} display={{ base: "none", sm: "block" }}>
        <Text fontFamily="stylizedCursive" fontSize="150px" align="center">
          Yogine
        </Text>
      </Box>
      <Center flex={1}>
        <Box
          p={20}
          boxShadow={{ base: "non", sm: "lg" }}
          borderRadius={"xl"}
          background={{
            base: "none",
            sm: "linear-gradient(-28deg, white 75%, #A2EAC3)",
          }}
        >
          <Stack spacing={3} minW={{ sm: "xs", md: "md" }}>
            <Heading mb={6}>Create your account</Heading>
            <FormControl isInvalid={alreadySubmitted && isFirstNameInvalid}>
              <FormLabel>First Name</FormLabel>
              <Input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              <FormErrorMessage>{"First name is required"}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={alreadySubmitted && isLastNameInvalid}>
              <FormLabel>Last Name</FormLabel>
              <Input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
              <FormErrorMessage>{"Last name is required"}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={alreadySubmitted && isEmailInvalid}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <FormErrorMessage>{"This is not a valid email"}</FormErrorMessage>
            </FormControl>
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
              Sign up
            </Button>
            {signUpError ? (
              <Alert status="error" borderRadius={"md"}>
                <AlertIcon />
                An unexpected error occurred while signing in...
              </Alert>
            ) : null}
          </Stack>
        </Box>
      </Center>
    </Flex>
  );
}

export default RegistrationForm;
