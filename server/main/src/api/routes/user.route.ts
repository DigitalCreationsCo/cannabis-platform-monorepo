import { Router } from 'express';
import { userCtrl } from '../controllers';
const router = Router();
/* =================================
User Routes

"/login"    login

================================= */

router.route('/login').post(userCtrl.login);

export default router;
