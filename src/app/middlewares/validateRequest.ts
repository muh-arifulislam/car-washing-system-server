import { ZodSchema } from "zod";
import catchAsync from "../utils/catchAsync";

const validateRequest = (schema: ZodSchema) => {
  return catchAsync(async (req, res, next) => {
    await schema.parseAsync({
      body: req.body,
    });
    next();
  });
};

export default validateRequest;
