import { Router } from 'express';
import { paymentCtrl } from '../controllers';
const router = Router();
/* =================================
API Routes for Payment Processing and Checkout

POST    '/checkout'             createCheckout

POST    '/purchase'             processPurchase

================================= */

router.route('/checkout').post(paymentCtrl.createCheckout);

// router.route('/purchase').post(paymentCtrl.processPurchase);

export default router;
