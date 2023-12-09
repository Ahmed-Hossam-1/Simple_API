import express from "express";
import { router } from "./routes/courses.route";
// import { MongoClient } from "mongodb";

const app = express();

app.use(express.json());
// app.use(bodyParser.json());

const coursesRouter = router;

app.use("/api/courses", coursesRouter);

app.listen(5000, () => {
  console.log("listening on port 5000");
});
