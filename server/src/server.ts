// server/src/server.ts
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import authRoutes from '@/routes/auth';
import userRoutes from '@/routes/user';
import type { Response } from 'express';
import cookieParser from 'cookie-parser';

const app = express();
dotenv.config(); // Load environment variables from .env file
const PORT = process.env.PORT!;

app.use(cors({ // Whats cors? = Cross-Origin Resource Sharing, a mechanism to allow or restrict requested resources on a web server depending on where the HTTP request was initiated.
  origin: 'http://localhost:1000',
  credentials: true,
}));
app.use(express.json()); // Middleware to parse JSON bodies to JS objects
app.use(cookieParser()); // Middleware to parse cookies

app.get('/', (_, res: Response) => {
  console.log('Root endpoint hit');
  res.send('Welcome to the Auth API!');
});

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});
