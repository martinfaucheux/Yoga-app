import React, { useState } from "react";
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  Center,
  Stack,
} from "@chakra-ui/react";
import AuthService from "../utils/AuthService";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await AuthService.login(email, password);
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
            onKeyPress={handleKeyPress}
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
    </Center>
  );
};

export default LoginPage;
