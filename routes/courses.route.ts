import {
  addcourse,
  deleteCourse,
  updateCourse,
  getAllCourses,
  getCourse,
  // getCoursesLimit,
} from "../controllers/courses.controller";
import express from "express";
import { validationSchema } from "../middleware/validationSchema";
import verFiyToken from "../middleware/veryFiyToken";
import { allowedTo } from "../middleware/allowedTo";

export const courseRouter = express.Router();

courseRouter
  .route("/")
  .get(verFiyToken, getAllCourses)
  .post(
    validationSchema(),
    verFiyToken,
    allowedTo("admin", "manager"),
    addcourse
  );

courseRouter
  .route("/:courseId")
  .patch(
    validationSchema(),
    allowedTo("admin", "manager"),
    verFiyToken,
    updateCourse
  )
  .delete(verFiyToken, allowedTo("admin", "manager"), deleteCourse)
  .get(verFiyToken, allowedTo("admin", "manager"), getCourse);
