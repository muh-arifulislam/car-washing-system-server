import { ZodError, ZodIssue } from "zod";
import { TErrorSources } from "../interface";

const handleZodError = (err: ZodError) => {
  const statusCode = 400;
  const message = "Zod validation error";
  const errorSources: TErrorSources[] = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue?.path?.length - 1],
      message: issue?.message,
    };
  });

  return {
    statusCode,
    message,
    errorSources,
  };
};

export default handleZodError;
