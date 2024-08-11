import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const generateAccessToken = (payload: JwtPayload) => {
  const token = jwt.sign(payload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expires_in,
  });

  return token;
};

export const jwtHelper = { generateAccessToken };
