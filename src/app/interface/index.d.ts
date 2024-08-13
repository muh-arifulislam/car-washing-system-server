import { TUser } from "../modules/user/user.interface";

export * from "./error.type";

declare global {
  namespace Express {
    interface Request {
      user: TUser;
    }
  }
}
