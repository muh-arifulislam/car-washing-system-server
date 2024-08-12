import { z } from "zod";

const userLoginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

export const AuthValidations = { userLoginSchema };
