import { NextFunction } from "express";
import jwt from "jsonwebtoken";
import { httpStatusText } from "../utils/httpStatusText";

const verFiyToken = (req: any, res: any, next: NextFunction) => {
  const authHeader =
    req.headers["Authorization"] || req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({
      status: httpStatusText.FAIL,
      message: "Unauthorized",
      code: 401,
    });
  }
  const token = authHeader.split(" ")[1];
  try {
    const currentUser = jwt.verify(token, process.env.JWT_SECRET as string);
    req.currentUser = currentUser;
    next();
  } catch (err) {
    res.status(401).json({
      status: httpStatusText.FAIL,
      message: "Invalid token",
      code: 401,
    });
  }
};

export default verFiyToken;
