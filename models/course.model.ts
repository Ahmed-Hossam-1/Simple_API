import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // to read .env file

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

export const Course = mongoose.model("Course", courseSchema);

const url: string = process.env?.URL_DB || "";

mongoose.connect(url).then(() => {
  console.log("connected to mongodb successfully");
});
