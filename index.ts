import express from "express";
import { courseRouter } from "./routes/courses.route";
import { httpStatusText } from "./utils/httpStatusText";
import cors from "cors";
import { userRouter } from "./routes/user.route";
const app = express();

app.use(cors()); // cors is a middleware

app.use(express.json());
// app.use(bodyParser.json());

const coursesRouter = courseRouter;
const usersRouter = userRouter;

app.use("/api/courses", coursesRouter);
app.use("/api/users", usersRouter);

// global middleware for error handling for routes that are not defined
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: httpStatusText.FAIL,
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

// global middleware for error handling for all errors
app.use((err: any, req: any, res: any, next: any) => {
  res.status(err.statusCode || 500).json({
    status: err.statusText || httpStatusText.ERROR,
    message: err.message,
    code: err.statusCode || 500,
    data: null,
  });
});

app.listen(5000, () => {
  console.log("listening on port 5000");
});
