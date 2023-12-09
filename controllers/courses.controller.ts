import { validationResult } from "express-validator";
import { Course } from "../models/course.model";
import { Request } from "express-validator/src/base";
import { httpStatusText } from "../utils/httpStatusText";

const getAllCourses = async (req: Request, res: any) => {
  try {
    // Pagination
    const limit = req.query?.limit ? parseInt(req.query.limit as string) : 2;
    const page = req.query?.page ? parseInt(req.query.page as string) : 0;
    const skip = (page - 1) * limit;
    // Get all courses from database
    const courses = await Course.find({}, { __v: 0 }).limit(limit).skip(skip);
    res.json({ status: httpStatusText.SUCCESS, data: { courses } });
  } catch (err: any) {
    res.status(404).json({
      status: httpStatusText.FAIL,
      data: { courses: err.message },
    });
  }
};

const getCourse = async (req: any, res: any) => {
  try {
    const course = await Course.findById(req.params.courseId, { __v: 0 });
    course
      ? res.json({ status: httpStatusText.SUCCESS, data: { course } })
      : res.status(404).json({ msg: "not found course" });
  } catch (err: any) {
    res.status(400).json({
      status: httpStatusText.ERROR,
      data: { course: err.message },
    });
  }
};

const addcourse = async (req: Request, res: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: httpStatusText.FAIL,
      data: errors.array(),
    });
  }
  const course = new Course(req.body);
  await course.save();
  res.status(201).json({ status: httpStatusText.SUCCESS, data: { course } });
};

const updateCourse = async (req: Request, res: any) => {
  const id = req.params?.courseId;
  try {
    const course = await Course.updateOne(
      { _id: id },
      { $set: { ...req.body } }
    );
    res.status(200).json({ status: httpStatusText.SUCCESS, data: { course } });
  } catch (err: any) {
    res.status(400).json({
      status: httpStatusText.ERROR,
      message: err.message,
    });
  }
};

const deleteCourse = async (req: any, res: any) => {
  try {
    await Course.deleteOne({ _id: req.params.courseId });
    res.status(200).json({ status: httpStatusText.SUCCESS, data: null });
  } catch (err: any) {
    res.status(400).json({
      status: httpStatusText.ERROR,
      data: err.message,
    });
  }
};

export { addcourse, deleteCourse, updateCourse, getAllCourses, getCourse };
