import { Router } from 'express';
import { accountCtrl } from '../controllers';
const router = Router();
/* =================================
API Routes for Stripe Account Creation, Editing, Updating, and Linking

POST    '/stripe/dispensary-account'            authorizeDispensaryAccount

================================= */

router.route('/stripe/dispensary-account').post(accountCtrl.createDispensaryAccount);

router.route('/stripe/check-onboard').post(accountCtrl.checkOnboardDispensaryAccount);

export default router;
