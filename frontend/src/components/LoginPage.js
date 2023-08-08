import React, { useState } from "react";
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  Center,
  Stack,
  Box,
} from "@chakra-ui/react";
import { useAuth } from "../utils/AuthService";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, login, logout } = useAuth();
  const navigate = useNavigate();

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

  return (
    <Center>
      <Box boxShadow={"lg"} mt={100} borderRadius={"xl"}>
        <Stack maxW={"600px"} spacing={3} padding="40px">
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyPress}
            />
          </FormControl>
          <Button
            onClick={handleLogin}
            background="#A2EAC3"
            _hover={{ bg: "#6DB990" }}
          >
            Login
          </Button>
        </Stack>
      </Box>
    </Center>
  );
};

export default LoginPage;
