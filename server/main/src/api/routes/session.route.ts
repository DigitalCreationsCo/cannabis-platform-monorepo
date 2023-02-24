import { Router } from 'express';
import { sessionCtrl } from '../controllers';
const router = Router();
/* =================================
Session Routes

"/"  getSession

================================= */

router.route('/').post(sessionCtrl.getSession);

export default router;
