import { Router } from 'express';
import { DailyDealsController as DailyDealsCtrl } from './daily-deals.controller';

const router = Router();

/* =================================
SMS Routes

"/daily-deals/:id"					GET getDailyDealById

"/daily-deals"						GET getActiveDailyDeals

"/daily-deals"						POST createDailyDeal

"/daily-deals/organization/:id"		GET getDailyDealsByOrganization

"/daily-deal-sms-response"          POST weedTextSmsResponse

================================= */

router.route('/daily-deals/:id').get(DailyDealsCtrl.getDailyDealById);

router.route('/daily-deals').get(DailyDealsCtrl.getActiveDailyDeals);

router.route('/daily-deals').post(DailyDealsCtrl.createDailyDeal);

router
	.route('/daily-deals/organization/:id')
	.get(DailyDealsCtrl.getManyDailyDealsByOrganization);

router
	.route('/daily-deal-sms-response')
	.post(DailyDealsCtrl.handleWeedTextOrder);

export default router;
