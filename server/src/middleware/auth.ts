import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import type { Request, Response, NextFunction } from 'express';
import { User } from '@/types/user';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;

// Auth middleware (for protected routes)
function authMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log('Auth middleware hit');
  const token = req.cookies.auth_token; // Get token from cookies
  if (!token)
    return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Verify token and get payload
    req.user = decoded as User; // Attach user info to request
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalid or expired' });
  }
}

export default authMiddleware;