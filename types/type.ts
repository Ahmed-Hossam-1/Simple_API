import { ValidationError } from "express-validator";

export type Courses = {
  id: number;
  title: string;
  price: number;
}[];

export type Response = {
  json(courses: Courses): unknown;
  status: (arg0: number) => {
    (): any;
    new (): any;
    json: { (arg0: { error: ValidationError[] }): void; new (): any };
  };
};

export type TPayload = { id: number; email: string };
