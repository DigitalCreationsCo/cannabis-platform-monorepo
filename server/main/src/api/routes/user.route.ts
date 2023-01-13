import { Router } from 'express';
import { verifySession } from 'supertokens-node/recipe/session/framework/express';
import { userCtrl } from "../controllers";
const router = Router();
/* =================================
User Routes

"/verifySession"    verifySession

"/login"    login

================================= */

router.route('/verifySession').post(userCtrl.verifySession);

router.route('/login').post(userCtrl.login);

export default router;
