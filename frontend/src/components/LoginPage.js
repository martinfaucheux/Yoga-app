import React, { useState } from "react";
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useAuth } from "../utils/AuthService";
import { useNavigate, useLocation } from "react-router-dom";
import BaseFormBox from "./BaseFormBox";

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

  return (
    <BaseFormBox>
      {location.state && location.state.successfulSignUp
        ? successfulSignUp()
        : null}
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
    </BaseFormBox>
  );
};

export default LoginPage;
