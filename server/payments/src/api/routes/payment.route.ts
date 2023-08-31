import { Router } from 'express';
import { paymentCtrl } from '../controllers';
const router = Router();
/* =================================
API Routes for Payment Processing and Checkout

POST    '/checkout'             createCheckout

================================= */

router.route('/checkout').post(paymentCtrl.createCheckout);

export default router;
