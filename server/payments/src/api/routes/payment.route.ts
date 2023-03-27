import { Router } from 'express';
import { paymentCtrl } from '../controllers';
const router = Router();
/* =================================
Payment Routes

'/purchase'             processOrderPayment

================================= */

router.route('/purchase').post(paymentCtrl.processPurchase);

export default router;
