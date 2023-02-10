import { Router } from 'express';
import { userCtrl } from '../controllers';
const router = Router();
/* =================================
User Routes

"/login"    login

"/:id"     getUserById

================================= */

router.route('/login').post(userCtrl.login);

router.route('/:id').post(userCtrl.getUserById);

export default router;
