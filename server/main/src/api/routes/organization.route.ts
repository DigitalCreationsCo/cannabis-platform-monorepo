import { Router } from 'express';
import { authenticateToken } from '../../server';
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

router.post('/', authenticateToken, orgCtrl.createOrganization);
router.put('/', authenticateToken, orgCtrl.updateOrganization);
router.get('/:id', authenticateToken, orgCtrl.getOrganizationById);
router.get(
	'/dashboard/:id',
	authenticateToken,
	orgCtrl.getOrganizationWithDashboardDetails,
);
router.delete('/:id', authenticateToken, orgCtrl.deleteOrganizationById);

router.get('/:id/categories', authenticateToken, orgCtrl.getCategoryList);
router.get('/:id/users', authenticateToken, orgCtrl.getUsersByOrganization);

router.get(
	'/zipcode=:zipcode&limit=:limit&radius=:radius',
	orgCtrl.getOrganizationsByZipcode,
);

export default router;
