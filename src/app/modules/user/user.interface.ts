import { Types } from "mongoose";

export type TUserRole = "user" | "admin";

export type TUser = {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: TUserRole;
  address: string;
};
