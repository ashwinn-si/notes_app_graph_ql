import jwt from "jsonwebtoken";

export const jwtVerification = ({ req }) => {
  const token = req.headers.authorization?.replace('Bearer ', '') || '';
  let user = null;
  if (token) {
    try {
      user = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    } catch (error) {
      // Token is invalid, user remains null
    }
  }

  return { req, user };
}