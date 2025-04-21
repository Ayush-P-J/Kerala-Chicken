import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.AUTH_SECRET || "yoursecret";

export function signJwtToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE_TIME,
    }
  );
}
