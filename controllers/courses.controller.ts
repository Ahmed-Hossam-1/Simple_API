import { validationResult } from "express-validator";
import { Course } from "../models/course.model";
import { Request } from "express-validator/src/base";
import { httpStatusText } from "../utils/httpStatusText";
import asyncWrapper from "../middleware/asyncWrapper";
import appError from "../utils/appError";

const getAllCourses = asyncWrapper(async (req: Request, res: any) => {
  // Pagination
  const limit = req.query?.limit ? parseInt(req.query.limit as string) : 2;
  const page = req.query?.page ? parseInt(req.query.page as string) : 1;
  const skip = (page - 1) * limit;
  // Get all courses from database
  const courses = await Course.find({}, { __v: 0 }).limit(limit).skip(skip);
  res.json({ status: httpStatusText.SUCCESS, data: { courses } });
});

const getCourse = asyncWrapper(async (req: any, res: any, next: any) => {
  const course = await Course.findById(req.params.courseId, { __v: 0 });
  if (!course) {
    const error = appError.create("Course not found", 404, httpStatusText.FAIL);
    return next(error);
  }
  res.json({ status: httpStatusText.SUCCESS, data: { course } });
});

const addcourse = asyncWrapper(async (req: Request, res: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    appError.create(errors.array()[0].msg, 404, httpStatusText.FAIL);
  }
  const course = new Course(req.body);
  await course.save();
  res.status(201).json({ status: httpStatusText.SUCCESS, data: { course } });
});

const updateCourse = asyncWrapper(async (req: Request, res: any) => {
  const id = req.params?.courseId;
  const course = await Course.updateOne({ _id: id }, { $set: { ...req.body } });
  res.status(200).json({ status: httpStatusText.SUCCESS, data: { course } });
});

const deleteCourse = asyncWrapper(async (req: any, res: any) => {
  await Course.deleteOne({ _id: req.params.courseId });
  res.status(200).json({ status: httpStatusText.SUCCESS, data: null });
});

export { addcourse, deleteCourse, updateCourse, getAllCourses, getCourse };

// const getAllCourses = async (req: Request, res: any) => {
//   try {
//     // Get all courses from database
//     const courses = await Course.find({}, { __v: 0 });
//     res.json({ status: httpStatusText.SUCCESS, data: { courses } });
//   } catch (err: any) {
//     res.status(404).json({
//       status: httpStatusText.FAIL,
//       data: { courses: err.message },
//     });
//   }
// };
