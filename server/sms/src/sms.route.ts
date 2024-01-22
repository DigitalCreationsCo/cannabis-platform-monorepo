import { Router } from 'express';
import { DailyDealsController as DailyDealsCtrl } from './daily-deals.controller';

const router = Router();

/* =================================
SMS Routes

"/daily-deal/:id"					GET getDailyDealById

"/daily-deal"						GET getActiveDailyDeals

"/daily-deal"						POST createDailyDeal

"/daily-deal/organization/:id"		GET getDailyDealsByOrganization

"/daily-deal-sms-response"          POST weedTextSmsResponse

================================= */

router.route('/daily-deal/:id').get(DailyDealsCtrl.getDailyDealById);

router.route('/daily-deal').get(DailyDealsCtrl.getActiveDailyDeals);

router.route('/daily-deal').post(DailyDealsCtrl.createDailyDeal);

router
	.route('/daily-deal/organization/:id')
	.get(DailyDealsCtrl.getManyDailyDealsByOrganization);

router
	.route('/daily-deal-sms-response')
	.post(DailyDealsCtrl.handleWeedTextOrder);

export default router;
