import {Router} from 'express'; // Router from express is a class that helps to create route handlers modularly.
import { getUserProfile } from '../controllers/user';
import authMiddleware from '../middleware/auth';


const router: Router = Router();

router.get('/getProfile', authMiddleware, getUserProfile);

export default router;