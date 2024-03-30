import express from "express";
import { validationSchema } from "../middleware/validationSchema";
import { usersController } from "../controllers/users.controller";
import verFiyToken from "../middleware/veryFiyToken";

import multer from "multer";
import appError from "../utils/appError";
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    const fileName = `user-${Date.now()}.${ext}`;
    cb(null, fileName);
  },
});
const fileFilter = (req: any, file: { mimetype: string }, cb: Function) => {
  const checkImg = file.mimetype.split("/")[0];
  console.log(checkImg, "checkImg");
  if (checkImg === "image") {
    return cb(null, true);
  } else {
    return cb(
      appError.create("file must be an image", 400, "FILE_ERROR"),
      false
    );
  }
};
const upload = multer({ storage: diskStorage, fileFilter: fileFilter });

export const userRouter = express.Router();

// get all users
userRouter.route("/").get(verFiyToken, usersController.getAllUsers);

// register user
userRouter
  .route("/register")
  .post(
    upload.single("avatar"),
    validationSchema(),
    usersController.registerUser
  );

// login user
userRouter.route("/login").post(validationSchema(), usersController.loginUser);
