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

export const courseRouter = express.Router();

courseRouter
  .route("/")
  .get(verFiyToken, getAllCourses)
  .post(validationSchema(), verFiyToken, addcourse);

courseRouter
  .route("/:courseId")
  .patch(validationSchema(), verFiyToken, updateCourse)
  .delete(verFiyToken, deleteCourse)
  .get(verFiyToken, getCourse);
