import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import type { Response } from 'express';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET!;
// Helper to create JWT
function createToken(user: any) {
  return jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
}

function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}

function sendTokenAsCookie(res: Response, token: string) {
    console.log('Cookie sent');
  return res.cookie('auth_token', token, {
    httpOnly: true, // Prevents JS access (XSS protection)
    secure: process.env.COOKIE_SECURE === 'production', // Only send over HTTPS in production
    sameSite: 'lax', // Protect against CSRF(Cross-Site Request Forgery)
    maxAge: 3600000, // 1 hour
  });

}

export { createToken, verifyToken, sendTokenAsCookie };