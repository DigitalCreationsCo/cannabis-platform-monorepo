import { Router } from 'express';
import { userCtrl } from '../controllers';
const router = Router();
/* =================================
User Routes

"/:id"                     getUserById

"/address"                      addAddressToUser

GET "/:id/address/:addressId"  getAddressById

DELETE "/:id/address/:addressId"  deleteAddressById

================================= */

router.route('/').post(userCtrl.createUser);

router.route('/').put(userCtrl.updateUser);

router.route('/admin').post(userCtrl.createDispensaryAdmin);

router.route('/admin').put(userCtrl.updateDispensaryAdmin);

router.route('/:id').get(userCtrl.getUserById);

router.route('/address').post(userCtrl.addAddressToUser);

router.route('/user/:id/address/:addressId').get(userCtrl.getAddressById);

router
	.route('/user/:id/address/:addressId')
	.delete(userCtrl.removeAddressFromUser);

export default router;
