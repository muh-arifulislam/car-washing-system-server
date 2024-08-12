import { Error } from "mongoose";
import { TErrorSources } from "../interface";

const handleCastError = (error: Error.CastError) => {
  const match = error?.message.match(/"([^"]*)"/);

  const extractedMessage = match && match[1];

  const errorSources: TErrorSources[] = [
    {
      path: error.path,
      message: extractedMessage ? `${extractedMessage} is invalid ID` : "",
    },
  ];
  return {
    statusCode: 400,
    message: "Cast Error",
    errorSources,
  };
};

export default handleCastError;
