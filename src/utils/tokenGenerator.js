import jwt from "jsonwebtoken"
import { config } from "dotenv"

config();

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
  console.log("JWT SECRET MISSING!")
}

export const generateJWTToken = async ({ userId }) => {
  const jwtToken = jwt.sign({ userId: userId }, JWT_SECRET)
  return jwtToken
}