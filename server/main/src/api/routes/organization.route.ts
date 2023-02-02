import { Router } from 'express';
import { orgCtrl } from '../controllers';
const router = Router();
/* =================================
Organization Routes

"/:id"     getOrganizationById

"/:id/categories"     getCategoryList

"/product/:id/update"     updateProduct

================================= */

router.route('/:id').get(orgCtrl.getOrganizationById);

router.route('/:id/categories').get(orgCtrl.getCategoryList);

router.route('/product/:id/update').put(orgCtrl.updateProduct);

export default router;
