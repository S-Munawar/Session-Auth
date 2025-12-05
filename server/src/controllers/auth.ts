import bcrypt from 'bcrypt';
import type { Request, Response } from 'express';
import users from '@/config/db';
import {createToken, sendTokenAsCookie} from '@/utils/jwt';
import { User } from '@/types/user';


// Register
async function Register(req: Request, res: Response) {
  console.log('Register endpoint hit');
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: 'Email and password required' });

  const existing = users.find(u => u.email === email);
  if (existing)
    return res.status(400).json({ message: 'User already exists' });

  const passwordHash = await bcrypt.hash(password, 10);
  const newUser: User = {
    id: users.length + 1,
    email,
    passwordHash,
  };
  users.push(newUser);

  const token =  createToken(newUser);
  sendTokenAsCookie(res, token);
  return res.status(201).json({ message: 'User created' });
};

// Login
async function Login(req: Request, res: Response) {
  console.log('Login endpoint hit');
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user)
    return res.json({ message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch)
    return res.json({ message: 'Invalid credentials' });
  const token = createToken(user);
  sendTokenAsCookie(res, token);
  return res.status(200).json({ message: 'Logged in' });
};

// Logout
async function Logout(res: Response) {
  console.log('Logout endpoint hit');
  res.clearCookie('auth_token');
  return res.status(200).json({ message: 'Logged out' });
}


export { Register, Login, Logout };