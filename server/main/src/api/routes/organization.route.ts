import { Router } from 'express';
import { orgCtrl } from '../controllers';
const router = Router();
/* =================================
Organization Routes

"/"                     createOrganization

"/:id"                  getOrganizationById

"/:id"                  deleteOrganizationById

"/zipcode/:zipcode"     getOrganizationByZipcode

"/:id/categories"       getCategoryList

"/:id/users"            getUsersByOrganization

"/product/:id/update"   updateProduct

================================= */

router.route('/').post(orgCtrl.createOrganization);

router.route('/').put(orgCtrl.updateOrganization);

router.route('/:id').get(orgCtrl.getOrganizationById);

router.route('/:id').delete(orgCtrl.deleteOrganizationById);

router
  .route('/zipcode/:zipcode&_:limit&_:radius')
  .get(orgCtrl.getOrganizationsByZipcode);

router.route('/:id/categories').get(orgCtrl.getCategoryList);

router.route('/:id/users').get(orgCtrl.getUsersByOrganization);

export default router;
