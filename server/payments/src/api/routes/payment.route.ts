import { Router } from 'express';
import { paymentCtrl } from '../controllers';
const router = Router();
/* =================================
API Routes for Payment Processing and Checkout

POST 	'/subscribe-dispensary' 	setupSubscribeDispensary

POST    '/checkout'             	createCheckout
POST    '/save-payment'         	saveCustomerPaymentMethod

================================= */

router
	.route('/subscribe-dispensary')
	.post(paymentCtrl.setupSubscribeDispensary);

router.route('/checkout').post(paymentCtrl.createCheckout);
router.route('/save-payment').post(paymentCtrl.saveCustomerPaymentMethod);

export default router;
