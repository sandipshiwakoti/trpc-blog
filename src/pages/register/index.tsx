import { Center } from "@chakra-ui/react";
import React from "react";
import RegisterForm from "~/pages/register/components/RegisterForm";

const Register = () => {
  return (
    <Center bg="gray.100" minH="100vh">
      <RegisterForm />
    </Center>
  );
};

export default Register;
