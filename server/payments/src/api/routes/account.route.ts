import { Router } from 'express';
import { stripeCtrl } from '../controllers';
const router = Router();
/* =================================
Stripe Account Routes

'/stripe/dispensary-authorize'     authorizeDispensaryAccount

================================= */

router.route('/stripe/dispensary-account').get(stripeCtrl.createDispensaryAccount);

export default router;
