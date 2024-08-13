import { ErrorRequestHandler, NextFunction } from "express";
import config from "../config";
import { ZodError } from "zod";
import handleZodError from "../errors/handleZodError";
import handleCastError from "../errors/handleCastError";
import { Error } from "mongoose";
import handleValidationError from "../errors/handleValidationError";
import handleDuplicateError from "../errors/handleDuplicateError";
import { TErrorSources } from "../interface";

const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  //default values
  let statusCode = err.statusCode || 500;
  let message = err.message || "something went wrong";

  let errorMessages: TErrorSources[] = [
    {
      path: "",
      message: "something went wrong",
    },
  ];

  //handle zod validation
  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorSources;
  }

  //handle cast error
  else if (err?.name === "CastError") {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorSources;
  }

  //handle validation error
  else if (err instanceof Error.ValidationError) {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorSources;
  }

  //handle duplicate error
  else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.node_env === "development" ? err.stack : undefined,
  });
};

export default globalErrorHandler;
