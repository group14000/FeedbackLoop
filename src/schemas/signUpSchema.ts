import { z } from 'zod';

// Define the username validation schema
export const usernameValidation = z
    .string()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(20, { message: "Username must be no more than 20 characters" })
    .regex(/^[a-zA-Z0-9_]+$/, { message: "Username must not contain special characters" });

// Define the signup schema
export const signupSchema = z.object({
    username: usernameValidation,
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" })
});
