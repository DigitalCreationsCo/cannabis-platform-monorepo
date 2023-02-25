import { Router } from 'express';
import { sessionCtrl } from '../controllers';

const router = Router();
/* =================================
Session Routes

"/"                 getSession

"/password/reset"   sendPasswordResetTokenEmail

"/password/reset"   doResetPassword

================================= */

router.route('/').get(sessionCtrl.getSession);

router.route('/password/reset').post(sessionCtrl.sendPasswordResetTokenEmail);

router.route('/password/reset/token').post(sessionCtrl.doResetPassword);

export default router;
