// server.ts
import express from 'express';
import {RedisStore} from 'connect-redis';
import { createClient } from 'redis';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import session from 'express-session';
import authRoutes  from './routes/auth';
import userRoutes  from './routes/user';

const app = express();
dotenv.config(); // Load environment variables from .env file
const PORT = process.env.PORT!;
app.use(express.json()); // Middleware to parse JSON bodies to JS objects

// Redis client setup (optional, for production)
const redisClient = createClient({
  url: process.env.REDIS_URL!
});
redisClient.connect().catch(console.error);

// Session configuration
app.use(session({
  store: new RedisStore({ client: redisClient }), // Remove for development (uses memory store)
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    httpOnly: true, // Prevents XSS attacks
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    sameSite: 'lax' // CSRF protection
  }
}));

app.use(cors({ // Whats cors? = Cross-Origin Resource Sharing, a mechanism to allow or restrict requested resources on a web server depending on where the HTTP request was initiated.
  origin: process.env.FRONTEND_URL!,
  credentials: true,
}));

app.get('/', (_, res: Response) => {
  console.log('Root endpoint hit');
  res.send('Welcome to the Auth API!');
});
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});

// Type augmentation for session
declare module 'express-session' {
  interface SessionData {
    userId: string;
  }
}