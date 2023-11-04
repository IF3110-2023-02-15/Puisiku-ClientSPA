import React from "react";
import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Heading,
  Stack,
  Link,
} from "@chakra-ui/react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";

interface IFormInput {
  email: string;
  password: string;
}

interface LoginViewProps {
  handleSubmit: any;
  register: UseFormRegister<IFormInput>;
  errors: FieldErrors<IFormInput>;
  isSubmitting: boolean;
  onSubmit: any;
}

const LoginView: React.FC<LoginViewProps> = ({
  handleSubmit,
  register,
  errors,
  isSubmitting,
  onSubmit,
}) => {
  return (
    <Center h="100vh" w="100vw" flexDirection="column" gap={5}>
      <Stack
        p={8}
        maxWidth="350px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        spacing={5}
      >
        <Heading as="h1" size="xl" fontWeight="bold">
          Login
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors.email}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input id="email" type="email" {...register("email")} />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl mt={4} isInvalid={!!errors.password}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input id="password" type="password" {...register("password")} />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
          >
            Login
          </Button>
        </form>
      </Stack>
      <Link as={RouterLink} to="/register" color="teal.500">
        Haven't had any account yet? Sign up!
      </Link>
    </Center>
  );
};

export default LoginView;
