import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Stack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { z } from "zod";

import Logo from "~/components/common/Logo";
import { useLogin } from "~/hooks/auth";

const Login = () => {
  const router = useRouter();
  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });
  type LoginSchema = z.infer<typeof loginSchema>;

  const { isLoading, mutate: login } = useLogin({
    onSuccess: async ({ accessToken }) => {
      localStorage.setItem("@token", accessToken);
      await router.push("/home");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginSchema) => {
    login(data);
  };

  return (
    <Center bg="gray.100" minH="100vh">
      <Stack placeItems="center" py="10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box bg="white" borderRadius="lg" p="10" w="500px">
            <Logo mb="5" />
            <Heading size="lg" mb="7" textAlign="center">
              Login to your account
            </Heading>
            <FormControl isInvalid={!!errors.email} mb="5">
              <FormLabel>Email</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={FaEnvelope} color="gray.300" />
                </InputLeftElement>
                <Input placeholder="Email address" {...register("email")} />
              </InputGroup>
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.password} mb="5">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={FaLock} color="gray.300" />
                </InputLeftElement>
                <Input
                  type="password"
                  placeholder="Password"
                  {...register("password")}
                />
              </InputGroup>
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>

            <Button
              colorScheme="blue"
              w="full"
              type="submit"
              isLoading={isLoading}
            >
              Login
            </Button>
            <Center mt="4">
              <Link href="/register" color="blue.600">
                Not registered?
              </Link>
            </Center>
          </Box>
        </form>
      </Stack>
    </Center>
  );
};

export default Login;
