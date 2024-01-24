import { Router } from 'express';
import { authenticateToken } from '../../server';
import { orgCtrl } from '../controllers';
const router = Router();
/* =================================
Organization Routes

GET '/zipcode=:zipcode&limit=:limit&radius=:radius' getOrganizationsByZipcode

POST "/"											createOrganization

PUT  "/"                     						updateOrganization

GET	 "/:id"                  						getOrganizationById

GET	 "/dashboard/:id"                  				getOrganizationWithDashboardDetails

DELETE "/:id"                  						deleteOrganizationById

GET "/:id/categories"       						getCategoryList

GET "/:id/users"            						getUsersByOrganization

================================= */

router.get(
	'/zipcode=:zipcode&limit=:limit&radius=:radius',
	orgCtrl.getOrganizationsByZipcode,
);

router.post('/', authenticateToken(), orgCtrl.createOrganization);
router.put('/', authenticateToken(), orgCtrl.updateOrganization);
router.get('/:id', authenticateToken(), orgCtrl.getOrganizationById);
router.get(
	'/dashboard/:id',
	authenticateToken(),
	orgCtrl.getOrganizationWithDashboardDetails,
);
router.delete('/:id', authenticateToken(), orgCtrl.deleteOrganizationById);

router.get('/:id/categories', authenticateToken(), orgCtrl.getCategoryList);
router.get('/:id/users', authenticateToken(), orgCtrl.getUsersByOrganization);

export default router;
