import { Router } from 'express';
import { Login, Logout, Register } from '../controllers/auth';


const router: Router = Router();

router.post('/register', Register);
router.post('/login', Login);
router.post('/logout', Logout);

export default router;