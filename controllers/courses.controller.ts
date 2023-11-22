import { validationResult } from "express-validator";
import { courses } from "../data/courses";
import { Request } from "express-validator/src/base";

const addcourse = (req: Request, res: any) => {
  //   console.log(req.body);
  const errors = validationResult(req);
  // console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  const course = {
    id: courses.length + 1,
    ...req.body,
  };
  courses.push(course);
  res.status(201).json(course);
};

const getAllCourses = (req: Request, res: any) => {
  res.json(courses);
};

const getCourse = (req: any, res: any) => {
  // console.log(req.params)
  const id: number = +req.params.courseId;
  const course = courses.find((course) => course.id == id);
  course ? res.json(course) : res.status(404).json({ msg: "not found course" });
};

const updateCourse = (req: Request, res: any) => {
  const id = req.params?.courseId;
  let course = courses.find((course) => course.id == id);
  if (!course) return res.status(404).json({ msg: "not found course" });
  course = { ...course, ...req.body };
  res.status(200).json(course);
};

const deleteCourse = (req: any, res: any) => {
  const id = +req.params.courseId;
  const newCourses = courses.filter((course) => course.id != id);
  res.json(newCourses);
};

export { addcourse, deleteCourse, updateCourse, getAllCourses, getCourse };
