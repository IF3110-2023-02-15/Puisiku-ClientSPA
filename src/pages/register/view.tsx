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
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegisterViewProps {
  handleSubmit: any;
  register: UseFormRegister<IFormInput>;
  errors: FieldErrors<IFormInput>;
  isSubmitting: boolean;
  onSubmit: any;
}

const RegisterView: React.FC<RegisterViewProps> = ({
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
          Register
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors.name}>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input id="name" type="text" {...register("name")} />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>
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
          <FormControl mt={4} isInvalid={!!errors.confirmPassword}>
            <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
            <Input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword")}
            />
            <FormErrorMessage>
              {errors.confirmPassword && errors.confirmPassword.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
          >
            Register
          </Button>
        </form>
      </Stack>
      <Link as={RouterLink} to="/" color="teal.500">
        Back to Landing Page
      </Link>
    </Center>
  );
};

export default RegisterView;
