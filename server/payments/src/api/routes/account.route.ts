import { Router } from 'express';
import { accountCtrl } from '../controllers';
const router = Router();
/* =================================
API Routes for Stripe Account Creation, Editing, Updating, and Linking

POST    '/'                 createStripeDispensaryAccount
PUT     '/'                 connectStripeToDispensaryAccount
POST    '/check-onboard'    checkOnboardStripeDispensaryAccount

================================= */

router.route('/connect').post(accountCtrl.connectStripeToDispensaryAccount);

router.route('/create').post(accountCtrl.createStripeDispensaryAccount);

router.route('/check-onboard').post(accountCtrl.checkOnboardStripeDispensaryAccount);

export default router;
