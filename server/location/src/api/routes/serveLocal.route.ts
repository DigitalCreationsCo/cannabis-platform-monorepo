import { Router } from 'express';
import { locationCtrl } from '../controllers';
const router = Router();
/* =================================
Serve Local Data Routes

/organizations      getLocalOrganizations

/create             addOrganizationLocationRecord

================================= */

router.route('/organizations').post(locationCtrl.getLocalOrganizations);

router.route('/organizations/record').post(locationCtrl.addOrganizationLocationRecord);

router.route('/organizations/record').put(locationCtrl.updateOrganizationLocationRecord);

export default router;
