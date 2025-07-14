import { TaskType } from "@prisma/client";
import { z } from "zod";

const passwordValidation = z
  .string()
  .min(6, "Password must be at least 6 characters long")
  .refine((val) => /[A-Z]/.test(val), {
    message: "Password must contain at least one capital letter",
  })
  .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
    message: "Password must contain at least one special character",
  });

export const completeProfileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.enum(["EMPLOYEE", "HR"], { required_error: "Role is required" }),
  image: z.string().optional(),
  designation: z.string().min(1, "Designation is required"),
  bankAccountNo: z.string().min(1, "Bank Account No. is required"),
  salary: z.coerce
    .number({ invalid_type_error: "Expected salary is required" })
    .min(5000, "Expected salary can not be less than 10,000")
    .max(1000000, "Expected salary cannot be greater than 100,000"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: passwordValidation,
    confirmPassword: passwordValidation,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const workEntrySchema = z.object({
  task: z.nativeEnum(TaskType, {
    required_error: "Task type is required",
    invalid_type_error: "Invalid task type",
  }),
  hours: z.coerce
    .number({
      required_error: "Hours worked is required",
      invalid_type_error: "Hours must be a number",
    })
    .min(1, { message: "You must log at least 1 hour" })
    .max(24, { message: "You cannot log more than 24 hours" }),
  date: z.preprocess((date) => new Date(date), z.date()),
});

export const payrollSchema = z.object({
  month: z.coerce
    .number({
      required_error: "Month is required",
      invalid_type_error: "Month must be a number",
    })
    .int("Month must be an integer")
    .min(1, "Month must be between 1 and 12")
    .max(12, "Month must be between 1 and 12"),

  year: z.coerce
    .number({
      required_error: "Year is required",
      invalid_type_error: "Year must be a number",
    })
    .int("Year must be an integer")
    .min(2000, "Year must be 2000 or later")
    .max(new Date().getFullYear(), "Year cannot be in the future"),
  salary: z
    .number({
      required_error: "Salary is required",
      invalid_type_error: "Salary must be a number",
    })
    .int("Salary must be an integer")
    .min(0, "Salary must be a positive number"),
});

