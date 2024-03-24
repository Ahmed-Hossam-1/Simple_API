import jwt from "jsonwebtoken";
import { TPayload } from "../types/type";

async function generateJWT(payload: TPayload) {
  const token = await jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "1m",
  });
  return token;
}

export default generateJWT;
