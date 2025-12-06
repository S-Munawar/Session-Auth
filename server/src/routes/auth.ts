// routes/auth.ts

import { Router } from 'express';
import { Register, Login, Logout } from '../controllers/auth';
import { requireAuth } from '../middleware/auth';

const router: Router = Router();

router.post('/register', Register);
router.post('/login', Login);
router.post('/logout', requireAuth, Logout);

export default router;