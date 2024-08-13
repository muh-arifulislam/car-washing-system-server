import httpStatus from "http-status";
import AppError from "../errors/AppError";
import catchAsync from "../utils/catchAsync";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { TUserRole } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";

const validateAuth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers?.authorization?.split(" ")[1];

    //check if token is available
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "unauthorized access!");
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;

    const { email, role } = decoded;

    //check user
    const user = await User.findOne({
      email,
    });
    if (!user) {
      throw new AppError(httpStatus.UNAUTHORIZED, "unauthorized access!");
    }

    //check user role
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        "You have no access to this route"
      );
    }

    //set user to req
    req.user = user;

    next();
  });
};

export default validateAuth;
