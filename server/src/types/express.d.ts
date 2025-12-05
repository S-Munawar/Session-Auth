import { User } from '@/types/user';

declare global {
  namespace Express {
    interface Request {
      user?: Partial<User>; // or whatever type your decoded JWT returns
    }
  }
}

export {};