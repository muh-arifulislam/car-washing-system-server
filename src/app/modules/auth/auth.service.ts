import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { jwtHelper } from "../../utils/jwtHelper";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import bcrypt from "bcrypt";

const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const loginUserIntoDB = async (payload: TLoginUser) => {
  const user = await User.findOne({ email: payload.email });

  //check if user is exists
  if (!user) {
    throw new Error("User not found");
  }

  //check if password is matched
  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    user.password
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, "Password is incorrect");
  }

  const token = jwtHelper.generateAccessToken({
    email: user.email,
    role: user.role,
  });

  return {
    token,
    data: user,
  };
};

export const AuthServices = { createUserIntoDB, loginUserIntoDB };