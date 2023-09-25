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

router.route('/staff').post(userCtrl.createDispensaryStaff);

router.route('/staff').put(userCtrl.updateDispensaryStaff);

router.route('/:id').get(userCtrl.getUserById);

router.route('/:id').delete(userCtrl.deleteUser);

router.route('/address').post(userCtrl.addAddressToUser);

router.route('/:id/orders').get(userCtrl.getOrdersForUser);

router.route('/:id/address/:addressId').get(userCtrl.getAddressById);

router.route('/:id/address/:addressId').delete(userCtrl.removeAddressFromUser);

export default router;
