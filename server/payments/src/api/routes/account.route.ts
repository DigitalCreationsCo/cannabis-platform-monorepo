import { Router } from 'express';
import { accountCtrl } from '../controllers';
const router = Router();
/* =================================
API Routes for Stripe Account Creation, Editing, Updating, and Linking

POST    '/stripe/dispensary-account'            authorizeDispensaryAccount

================================= */

router.route('/dispensary-account').post(accountCtrl.createStripeDispensaryAccount);

router.route('/check-onboard').post(accountCtrl.checkOnboardStripeDispensaryAccount);

export default router;
