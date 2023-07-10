import { Router } from 'express';
import { locationCtrl } from '../controllers';
const router = Router();
/* =================================
Serve Local Data Routes

/organizations          POST    getLocalOrganizations
/organizations/record   POST    createOrganizationLocationRecord
/organizations/record   PUT     updateOrganizationLocationRecord
/organizations/:id      DELETE  deleteOrganizationLocationRecord

================================= */

router.route('/organizations').post(locationCtrl.getLocalOrganizations);

router
  .route('/organizations/record')
  .post(locationCtrl.createOrganizationLocationRecord);

router
  .route('/organizations/record')
  .put(locationCtrl.updateOrganizationLocationRecord);

router
  .route('/organizations/:id')
  .delete(locationCtrl.deleteOrganizationLocationRecord);

export default router;
