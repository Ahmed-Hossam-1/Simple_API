import { Request, Response, NextFunction } from "express";
import appError from "../utils/appError";

interface RoleMiddleware {
  (...roles: string[]): (req: any, res: Response, next: NextFunction) => void;
}

const allowedTo: RoleMiddleware = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.currentUser.role)) {
      return next(
        appError.create("this role is not authrized", 401, "UnAuthorized")
      );
    }
    next();
  };
};

export { allowedTo };
