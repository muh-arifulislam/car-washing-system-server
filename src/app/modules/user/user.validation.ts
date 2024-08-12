import { z } from "zod";

const createUserSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required!",
      invalid_type_error: "Name must be a string!",
    }),
    email: z
      .string({
        required_error: "Email is required!",
      })
      .email({ message: "Invalid email!" }),
    password: z.string({
      required_error: "Password is required!",
      invalid_type_error: "Password must be a string!",
    }),
    phone: z.string({
      required_error: "Phone is required!",
      invalid_type_error: "Phone must be a string!",
    }),
    role: z.enum(["user", "admin"], {
      required_error: "User role is required!",
      invalid_type_error: 'User role must be "user" or "admin" !!!',
    }),
    address: z.string({
      required_error: "Address is required!",
      invalid_type_error: "Address must be a string!",
    }),
  }),
});

export const UserValidations = { createUserSchema };
