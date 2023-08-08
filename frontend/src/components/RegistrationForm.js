import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";
import BaseFormBox from "./BaseFormBox";
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
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setAlreadySubmitted(true);
    const postData = {
      email: formData.email,
      password: formData.password,
      first_name: formData.firstName,
      last_name: formData.lastName,
    };
    try {
      await customFetch.post("/api/users/", postData);
      navigate("/login");
    } catch (error) {
      console.error("Signup failed:", error);
    }
    // Here, you can make the POST request to your server using the formData
    // axios.post('/api/users', formData)
    //   .then(response => {
    //     // Handle success
    //   })
    //   .catch(error => {
    //     // Handle error
    //   });
    console.log(formData);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <BaseFormBox>
      <FormControl isInvalid={alreadySubmitted && formData.firstName === ""}>
        <FormLabel>First Name</FormLabel>
        <Input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <FormErrorMessage>{"First name is required"}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={alreadySubmitted && formData.lastName === ""}>
        <FormLabel>Last Name</FormLabel>
        <Input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        <FormErrorMessage>{"Last name is required"}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={alreadySubmitted && formData.email === ""}>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <FormErrorMessage>{"Email is required"}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={alreadySubmitted && formData.password === ""}>
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
        isInvalid={
          alreadySubmitted && formData.password != formData.confirmPassword
        }
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
    </BaseFormBox>
  );
}

export default RegistrationForm;
