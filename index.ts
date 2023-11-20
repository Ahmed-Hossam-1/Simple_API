import express from "express";
import { Courses } from "./types/type";
import { body, validationResult } from "express-validator";

const app = express();

app.use(express.json());
// app.use(bodyParser.json());

// dummy data
const courses: Courses = [
  {
    id: 1,
    title: "Js Course",
    price: 1000,
  },
  {
    id: 2,
    title: "C++ Course",
    price: 1500,
  },
  {
    id: 3,
    title: "SQL Course",
    price: 800,
  },
  {
    id: 4,
    title: "React Course",
    price: 2000,
  },
];

// CRUD (Create, Read, Update, Delete)
// Get All Courses
app.get("/api/courses", (req, res) => {
  res.json(courses);
});
// Get Single Course
app.get(`/api/courses/:courseId`, (req, res) => {
  // console.log(req.params)
  const id: number = +req.params.courseId;
  const course = courses.find((course) => course.id == id);
  course ? res.json(course) : res.status(404).json({ msg: "not found course" });
});
// Create Course
app.post(
  "/api/courses",
  body("title").notEmpty(),
  body("price").notEmpty(),
  (req, res) => {
    //   console.log(req.body);
    // validation
    //   if (!req.body.title) {
    //     return res.status(400).json({ error: "title not provided" });
    //   } else if (!req.body.price) {
    //     return res.status(400).json({ error: "price not provided" });
    //   }
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    const course = {
      id: courses.length + 1,
      ...req.body,
    };
    courses.push(course);
    res.status(201).json(course);
  }
);
// Update Course
app.patch(
  `/api/courses/:courseId`,
  body("title").notEmpty(),
  body("price").notEmpty(),
  (req, res) => {
    const id = req.params?.courseId;
    let course = courses.find((course) => course.id == id);
    if (!course) return res.status(404).json({ msg: "not found course" });
    course = { ...course, ...req.body };
    res.status(200).json(course);
  }
);
// Delete Course
app.delete(`/api/courses/:courseId`, (req, res) => {
  const id = +req.params.courseId;
  const newCourses = courses.filter((course) => course.id != id);
  res.json(newCourses);
});

app.listen(5000, () => {
  console.log("listening on port 5000");
});
