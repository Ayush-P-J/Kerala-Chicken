import { z } from "zod";

export const credentialsSchema = z
  .object({
    level: z.string().min(1, { message: "Level is required" }).trim(),
    username: z.string().min(1, { message: "User name is required" }).trim(),
    email: z.string().email({ message: "Invalid email address" }).trim(),
    password: z.string().min(1, { message: "Password is required" }).trim(),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required" })
      .trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const credentialsEditSchema = z.object({
  username: z.string().min(1, { message: "User name is required" }).trim(),
  email: z.string().email({ message: "Invalid email address" }).trim(),
});

export const changePasswordSchema = z
  .object({
    password: z.string().min(1, { message: "Password is required" }).trim(),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required" })
      .trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
