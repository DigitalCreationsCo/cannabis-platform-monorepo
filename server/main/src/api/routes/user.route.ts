import { Router } from 'express';
import { userCtrl } from '../controllers';
const router = Router();
/* =================================
User Routes

"/login"                        login

"/user/:id"                     getUserById

"/user/:id/address/:addressId"  getAddressById

"/user/:id/address/:addressId"  deleteAddressById

================================= */

router.route('/login').post(userCtrl.login);

router.route('/user/:id').get(userCtrl.getUserById);

router.route('/user/:id/address/:addressId').get(userCtrl.getAddressById);

router.route('/user/:id/address/:addressId').delete(userCtrl.deleteAddressById);

export default router;
