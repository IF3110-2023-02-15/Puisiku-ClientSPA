import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import RegisterView from "./view";
import { registerUser } from "@/api";
import { useNavigate } from "react-router-dom";

const schema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type IFormInput = z.infer<typeof schema>;

const Register: React.FC = () => {
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
      registerUser(values);
      navigate("/login");
    } catch (error) {
      console.error("Error registering user", error);
    }
  };

  return (
    <RegisterView
      handleSubmit={handleSubmit}
      register={register}
      errors={errors}
      isSubmitting={isSubmitting}
      onSubmit={onSubmit}
    />
  );
};

export default Register;