import { Router } from 'express';
import { locationCtrl } from '../controllers';
const router = Router();
/* =================================
Serve Local Data Routes

================================= */

router.route('/organizations').post(locationCtrl.getLocalOrganizations);

export default router;
