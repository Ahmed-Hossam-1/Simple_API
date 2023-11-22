import { body } from "express-validator";

export const validationSchema = () => {
  return [
    body("title").notEmpty().isLength({ min: 2 }),
    body("price").notEmpty(),
  ];
};
