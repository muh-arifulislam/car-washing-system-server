import { Error } from "mongoose";
import { TErrorSources } from "../interface";

const handleValidationError = (error: Error.ValidationError) => {
  const statusCode = 400;

  const errorSources: TErrorSources[] = Object.keys(error?.errors).map(
    (err: string) => ({
      path: error?.errors[err].path,
      message: error?.errors[err].message,
    })
  );

  return {
    message: "Validation Error",
    statusCode,
    errorSources,
  };
};

export default handleValidationError;
