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
import type { SubmitHandler } from "react-hook-form";
import { FaAt, FaEnvelope, FaLock, FaUserAlt } from "react-icons/fa";
import { z } from "zod";

import Logo from "~/components/common/Logo";
import { useRegister } from "~/hooks/auth";

const RegisterForm = () => {
  const router = useRouter();
  const registerSchema = z
    .object({
      name: z.string(),
      username: z.string(),
      email: z.string().email(),
      password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password not matched",
      path: ["confirmPassword"],
    });

  type RegisterSchema = z.infer<typeof registerSchema>;

  const { isLoading, mutate: registerUser } = useRegister({
    onSuccess: async () => {
      await router.push("/");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    name: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterSchema> = (data: RegisterSchema) => {
    // alert(JSON.stringify(data));
    registerUser(data);
  };

  return (
    <Stack placeItems="center" py="10">
      <form>
        <Box bg="white" borderRadius="lg" p="10" w="500px">
          <Logo mb="5" />
          <Heading size="lg" mb="7" textAlign="center">
            Register your account
          </Heading>
          <FormControl isInvalid={!!errors.name} mb="5">
            <FormLabel>Full name</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FaUserAlt} color="gray.300" />
              </InputLeftElement>
              <Input placeholder="Full name" {...register("name")} />
            </InputGroup>
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.username} mb="5">
            <FormLabel>Username</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FaAt} color="gray.300" />
              </InputLeftElement>
              <Input placeholder="Username" {...register("username")} />
            </InputGroup>
            <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
          </FormControl>
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
          <FormControl isInvalid={!!errors.confirmPassword} mb="5">
            <FormLabel>Confirm password</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FaLock} color="gray.300" />
              </InputLeftElement>
              <Input
                type="password"
                placeholder="Confimr password"
                {...register("confirmPassword")}
              />
            </InputGroup>
            <FormErrorMessage>
              {errors.confirmPassword?.message}
            </FormErrorMessage>
          </FormControl>

          <Button
            colorScheme="blue"
            w="full"
            type="submit"
            isLoading={isLoading}
            onClick={handleSubmit(onSubmit)}
          >
            Register
          </Button>
          <Center mt="4">
            <Link href="/" color="blue.600">
              Already registered?
            </Link>
          </Center>
        </Box>
      </form>
    </Stack>
  );
};

export default RegisterForm;
