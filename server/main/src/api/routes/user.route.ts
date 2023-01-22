import { Router } from 'express';
import { userCtrl } from '../controllers';
const router = Router();
/* =================================
User Routes

"/login"                login

'/user-details/:id'     getUserDetails


================================= */

router.route('/login').post(userCtrl.login);

router.route('/user-details/:id').get(userCtrl.getUserDetails);

export default router;
