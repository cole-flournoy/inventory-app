import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

const createSecretToken = (userId: string) => {

  return jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: 3 * 24 * 60 * 60,
  });
}

export default createSecretToken;