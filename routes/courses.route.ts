import {
  addcourse,
  deleteCourse,
  updateCourse,
  getAllCourses,
  getCourse,
} from "../controllers/courses.controller";
import express from "express";
import { validationSchema } from "../middleware/validationSchema";

export const router = express.Router();

router.route("/").get(getAllCourses).post(validationSchema(), addcourse);

router
  .route("/:courseId")
  .patch(validationSchema(), updateCourse)
  .delete(deleteCourse)
  .get(getCourse);
