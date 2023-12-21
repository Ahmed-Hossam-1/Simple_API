import asyncWrapper from "../middleware/asyncWrapper";
import { User } from "../models/user.model";
import appError from "../utils/appError";
import { httpStatusText } from "../utils/httpStatusText";
import bcrypt from "bcrypt";

const getAllUsers = asyncWrapper(async (req: any, res: any) => {
  // Pagination
  const limit = req.query?.limit ? parseInt(req.query.limit as string) : 2;
  const page = req.query?.page ? parseInt(req.query.page as string) : 1;
  const skip = (page - 1) * limit;
  // Get all users from database
  const users = await User.find({}, { __v: 0, password: 0 })
    .limit(limit)
    .skip(skip);
  res.json({ status: httpStatusText.SUCCESS, data: { users } });
});

const registerUser = asyncWrapper(async (req: any, res: any) => {
  const { firstName, lastName, email, password } = req.body;
  const oldUser = await User.findOne({ email });
  if (oldUser) {
    return res.status(409).json({
      status: httpStatusText.CONFLICT,
      message: "User already exists",
      code: 409,
    });
  }

  // Password hashing
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
  res.status(201).json({
    status: httpStatusText.SUCCESS,
    message: "User created",
    code: 201,
    data: { user },
  });
});

const loginUser = asyncWrapper(async (req: any, res: any, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    const error = appError.create(
      "Please provide email and password",
      400,
      httpStatusText.BAD_REQUEST
    );
    return next(error);
  }

  const user = (await User.findOne({ email })) as any;
  const matchedPassword = await bcrypt.compare(password, user.password);

  if (user && matchedPassword) {
    res.status(200).json({
      status: httpStatusText.SUCCESS,
      message: "User logged in",
      code: 200,
      data: { user },
    });
  } else {
    const error = appError.create(
      "Incorrect email or password",
      401,
      httpStatusText.ERROR
    );
    return next(error);
  }
});

export const usersController = {
  getAllUsers,
  registerUser,
  loginUser,
};
