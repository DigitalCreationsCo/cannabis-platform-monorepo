import { Router } from 'express';
import { accountCtrl } from '../controllers';
const router = Router();
/* =================================
API Routes for Stripe Account Creation, Updating, and Linking

POST    '/create'           createStripeDispensaryAccount
POST    '/connect'          connectStripeDispensaryAccount
POST    '/check-onboard'    checkOnboardStripeDispensaryAccount

================================= */

router.route('/create').post(accountCtrl.createStripeDispensaryAccount);
router.route('/connect').post(accountCtrl.connectStripeDispensaryAccount);
router
	.route('/check-onboard')
	.post(accountCtrl.checkOnboardStripeDispensaryAccount);

export default router;
