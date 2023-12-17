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

export const courseRouter = express.Router();

courseRouter.route("/").get(getAllCourses).post(validationSchema(), addcourse);

courseRouter
  .route("/:courseId")
  .patch(validationSchema(), updateCourse)
  .delete(deleteCourse)
  .get(getCourse);
