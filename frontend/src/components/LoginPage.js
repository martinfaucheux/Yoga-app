import React, { useState } from "react";
import {
  Button,
  Input,
  FormControl,
  Text,
  Stack,
  Link as ChakraLink,
  FormLabel,
  Heading,
  Box,
  Container,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useAuth } from "../utils/AuthService";
import { useNavigate, useLocation, Link as RouterLink } from "react-router-dom";
import BaseFormBox from "./BaseFormBox";
import { PasswordField } from "./PasswordField";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async () => {
    try {
      const response = await login(email, password);
      return navigate("/sessions");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  const successfulSignUp = () => (
    <Alert status="success" borderRadius={"md"} colorScheme={"blue"}>
      <AlertIcon />
      Account created successfully! You can now log in.
    </Alert>
  );

  const Logo = (props) => (
    <Text fontFamily="stylizedCursive" fontSize="8xl" align="center">
      Yogine
    </Text>
  );

  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <Logo />
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading size={{ base: "xs", md: "sm" }}>
              Log in to your account
            </Heading>
            <Text color="fg.muted">
              Don't have an account?{" "}
              <ChakraLink
                to="/register"
                color="#6DB990"
                style={{ fontWeight: "bold" }}
                as={RouterLink}
              >
                Sign up
              </ChakraLink>
            </Text>
          </Stack>
        </Stack>
        <Box
          py={{ base: "0", sm: "8" }}
          px={{ base: "4", sm: "10" }}
          bg={{ base: "transparent", sm: "bg.surface" }}
          boxShadow={{ base: "none", sm: "md" }}
          borderRadius={{ base: "none", sm: "xl" }}
          background="linear-gradient(-28deg, white 75%, #A2EAC3)"
        >
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <PasswordField
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyPress}
              />
            </Stack>
            {/* <HStack justify="space-between">
              <Button variant="text" size="sm">
                Forgot password?
              </Button>
            </HStack> */}
            <Stack spacing="6">
              <Button
                onClick={handleLogin}
                background="#A2EAC3"
                _hover={{ bg: "#6DB990" }}
              >
                Sign in
              </Button>
              {location.state && location.state.successfulSignUp
                ? successfulSignUp()
                : null}
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );

  // return (
  //   <BaseFormBox>
  //     {location.state && location.state.successfulSignUp
  //       ? successfulSignUp()
  //       : null}
  //     <FormControl id="email">
  //       <FormLabel>Email</FormLabel>
  //       <Input
  //         type="email"
  //         value={email}
  //         onChange={(e) => setEmail(e.target.value)}
  //       />
  //     </FormControl>
  //     <FormControl id="password">
  //       <FormLabel>Password</FormLabel>
  //       <Input
  //         type="password"
  //         value={password}
  //         onChange={(e) => setPassword(e.target.value)}
  //         onKeyDown={handleKeyPress}
  //       />
  //     </FormControl>
  //     <Button
  //       onClick={handleLogin}
  //       background="#A2EAC3"
  //       _hover={{ bg: "#6DB990" }}
  //     >
  //       Login
  //     </Button>
  //   </BaseFormBox>
  // );
};

export default LoginPage;
