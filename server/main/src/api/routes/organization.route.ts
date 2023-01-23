import { Router } from 'express';
import { orgCtrl } from '../controllers';
const router = Router();
/* =================================
Organization Routes

"/:id/categories"           getCategoryList

"/product/:id/update"       updateProduct

'/:id/users'                getUsersByOrg

'/:id/site-settings'        getSettings

================================= */

router.route('/:id/categories').get(orgCtrl.getCategoryList);

router.route('/product/:id/update').put(orgCtrl.updateProduct);

router.route('/:id/users').get(orgCtrl.getUsersByOrg);

router.route('/:id/site-settings').post(orgCtrl.getSettings);

export default router;
