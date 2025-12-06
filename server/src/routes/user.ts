import {Router} from 'express';
import {GetCurrentUser} from '../controllers/auth';
import {requireAuth} from '../middleware/auth';

const router: Router = Router();

router.get('/getProfile', requireAuth, GetCurrentUser);

export default router;