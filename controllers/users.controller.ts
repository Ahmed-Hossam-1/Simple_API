import { User } from "../models/user.model";
import { httpStatusText } from "../utils/httpStatusText";

const getAllUsers = async (req: any, res: any) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: httpStatusText.SUCCESS,
      message: "All users",
      code: 200,
      data: users,
    });
  } catch (error: string | any) {
    res.status(500).json({
      status: httpStatusText.ERROR,
      message: error.message,
      code: 500,
      data: null,
    });
  }
};

const registerUser = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;
    const user = await User.create({ email, password });
    res.status(201).json({
      status: httpStatusText.SUCCESS,
      message: "User created",
      code: 201,
      data: user,
    });
  } catch (error: string | any) {
    res.status(500).json({
      status: httpStatusText.ERROR,
      message: error.message,
      code: 500,
      data: null,
    });
  }
};

const loginUser = async (req: any, res: any) => {};

export const usersController = {
  getAllUsers,
  registerUser,
  loginUser,
};
