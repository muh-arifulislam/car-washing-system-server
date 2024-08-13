import { Error } from "mongoose";
import { TErrorSources } from "../interface";

const handleDuplicateError = (error: Error) => {
  const match = error?.message.match(/"([^"]*)"/);

  const extractedMessage = match && match[1];

  const errorMessages: TErrorSources[] = [
    {
      path: "",
      message: extractedMessage ? `${extractedMessage} is already exists` : "",
    },
  ];
  return {
    statusCode: 400,
    message: "Duplicate Error",
    errorMessages,
  };
};

export default handleDuplicateError;
