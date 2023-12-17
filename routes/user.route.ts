import express from "express";
import { validationSchema } from "../middleware/validationSchema";
import { usersController } from "../controllers/users.controller";

export const userRouter = express.Router();

// get all users
userRouter.route("/").get(usersController.getAllUsers);

// register user
userRouter
  .route("/register")
  .post(validationSchema(), usersController.registerUser);

// login user
userRouter.route("/login").post(validationSchema(), usersController.loginUser);
