import { Router } from 'express';
import { userCtrl } from '../controllers';
const router = Router();
/* =================================
User Routes

"/user/:id"                     getUserById

"/address"                      addAddressToUser

"/user/:id/address/:addressId"  getAddressById

"/user/:id/address/:addressId"  deleteAddressById

================================= */

router.route('/user/:id').get(userCtrl.getUserById);

router.route('/address').post(userCtrl.addAddressToUser);

router.route('/user/:id/address/:addressId').get(userCtrl.getAddressById);

router.route('/user/:id/address/:addressId').delete(userCtrl.removeAddressFromUser);

export default router;
