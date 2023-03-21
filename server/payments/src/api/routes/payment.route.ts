import { Router } from 'express';
import { paymentCtrl, stripeCtrl } from '../controllers';
const router = Router();
/* =================================
Payment Routes

'/purchase'             processOrderPayment

'/stripe/authorize'     authorizeDispensaryAccount

================================= */

router.route('/purchase').post(paymentCtrl.processPurchase);

router.route('/stripe/authorize').get(stripeCtrl.authorizeDispensaryAccount);

export default router;
