import { email, z } from "zod";

export const registerSchema = z.object({
  email: z.string().email("invalid email format"),
  password: z.string().min(7, "Password must be at least 7 character"),
});

export const loginSchema = z.object({
  email: z.string().email("invalid email password"),
  password: z.string().min(7, "Password must be at least 7 character"),
});
