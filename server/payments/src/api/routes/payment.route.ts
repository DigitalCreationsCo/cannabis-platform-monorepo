import { Router } from 'express';
import { paymentCtrl, stripeCtrl } from '../controllers';
const router = Router();
/* =================================
Payment Routes

"/user/:id"                     getUserById

"/address"                      addAddressToUser

"/user/:id/address/:addressId"  getAddressById

"/user/:id/address/:addressId"  deleteAddressById

================================= */

// router.route('/user/:id').get(paymentCtrl.getUserById);

router.route('/purchase').post(paymentCtrl.processPayment);
router.route('/stripe/authorize').get(stripeCtrl.authorizeDispensaryAccount);

export default router;
