import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface AuthenticatedRequest extends Request {
    userID?: string;
};

const authToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.header('x-auth-token');

  if (!token) {
    res.status(401).send('Unauthorized');
    return;
  }

  try {
    const decodedPayload: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
    req.userID = decodedPayload.userID;
    next();
  } catch (error) {
    res.status(403).send('Forbidden');
  }
};

export default authToken;
