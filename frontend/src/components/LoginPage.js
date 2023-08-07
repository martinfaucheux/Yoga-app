import React, { useState } from "react";
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  Center,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("/api/token/", {
        email,
        password,
      });

      const { access, refresh } = response.data;

      setAccessToken(access);
      localStorage.setItem("jwtToken", access);
      setRefreshToken(refresh);

      // You can also store the tokens in local storage or a global state management solution like Redux
    } catch (error) {
      console.error("Login failed:", error);
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
