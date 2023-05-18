import { Router } from 'express';
import { accountCtrl } from '../controllers';
const router = Router();
/* =================================
API Routes for Stripe Account Creation, Editing, Updating, and Linking

POST    '/stripe/dispensary-account'            authorizeDispensaryAccount

================================= */

router.route('/:s').get(accountCtrl.createStripeDispensaryAccount);

router.route('/create').post(accountCtrl.connectStripeToDispensaryAccount);

router.route('/check-onboard').post(accountCtrl.checkOnboardStripeDispensaryAccount);

export default router;
