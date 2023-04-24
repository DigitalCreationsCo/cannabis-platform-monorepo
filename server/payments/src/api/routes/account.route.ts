import { Router } from 'express';
import { accountCtrl } from '../controllers';
const router = Router();
/* =================================
API Routes for Stripe Account Creation, Editing, Updating, and Linking

POST    '/stripe/dispensary-account'            authorizeDispensaryAccount

================================= */

router.route('/dispensary-account').post(accountCtrl.createDispensaryAccount);

router.route('/check-onboard').post(accountCtrl.checkOnboardDispensaryAccount);

export default router;
