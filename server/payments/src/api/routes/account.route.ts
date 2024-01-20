import { Router } from 'express';
import { accountCtrl } from '../controllers';
const router = Router();
/* =================================
API Routes for Stripe Account Creation, Updating, and Linking

POST    '/create'           createStripeDispensaryAccount
POST    '/connect'          connectStripeDispensaryAccount
POST    '/check-onboard'    checkOnboardStripeDispensaryAccount

================================= */

router.route('/').post(accountCtrl.getStripeAccount);

// dispensary account methods
router
	.route('/create-dispensary')
	.post(accountCtrl.createStripeAccountDispensary);
router
	.route('/connect-dispensary')
	.post(accountCtrl.connectStripeAccountDispensary);
router
	.route('/check-onboard-dispensary')
	.post(accountCtrl.checkOnboardStripeDispensaryAccount);

// customer account methods
router.route('/create-customer').post(accountCtrl.createStripeAccountCustomer);

// driver account methods
router
	.route('/create-driver')
	.post(accountCtrl.createStripeAccountDeliveryDriver);

// platform account methods

export default router;
