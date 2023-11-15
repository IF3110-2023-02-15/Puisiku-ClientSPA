import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import LoginView from "./view";
import { loginUser } from "@/api";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type IFormInput = z.infer<typeof schema>;

const Login: React.FC = () => {
  const { login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (values) => {
    try {
      const data = await loginUser(values);
      const { token } = data;

      login(token);

      toast({
        title: "Success",
        description: "Successfully logged in!",
        status: "success",
        isClosable: true,
        duration: 3000,
      });
      navigate("/home");
    } catch (error: any) {
      let description = "Register failed!";
      if (error?.response?.status == 401) {
        description = error.response.data.error
      }
      toast({
        title: "An error occurred.",
        description: description,
        status: "error",
        isClosable: true,
        duration: 3000,
      });
    }
  };

  return (
    <LoginView
      handleSubmit={handleSubmit}
      register={register}
      errors={errors}
      isSubmitting={isSubmitting}
      onSubmit={onSubmit}
    />
  );
};

export default Login;
