import SMS from '@cd/core-lib/lib/sms';
import { findActiveDailyDeals } from '@cd/data-access';
import { schedule } from 'node-cron';
import { setCacheDailyDeal } from './daily-deals.controller';

export default class DailyDealScheduler {
	static start() {
		this.runUpdateDailyDealsTask();
		this.runSendDailyDealsTask();
	}

	static async runUpdateDailyDealsTask() {
		try {
			// run this task at midnight every day
			schedule('0 0 * * *', () => {
				updateDailyDealsCache();
			});
		} catch (error) {
			console.error('runUpdateDailyDealsTask: ', error);
			// send an alert email if this fails
		}
	}

	static async runSendDailyDealsTask() {
		try {
			// get daily deal from from database
			// schedule a chron job to send the daily deal to DailyStory SMS api, targeting the appropriate customer segment
			// save the daily deal to redis
			// 1. get orgs that are subscribed for daily deals
			//
			// send each deal to a customer segment in dailystory
			// dynamically divide segments based on the number of deals.
			// 1. get the number of deals
			// 2. send deals to the most popular segments
			// 3. if any segments are left over, send the top deals to those segments ( ranked by subscription tier )
			//
			// 2. get the latest daily deal for each org
			// 3. get cached user list for each org, from redis -- structure this as a hash?
			// 4. loop through each deal, send the daily to dailyStory - send subscribed users as recipients,
			// OPTION: create user segments on dailyStory?? - this would be easier, and woulnd't require a redis cache
			// NOTE: store the segmentID for each org
			// schema update: add segmentId to organization table
			//              : add user
			//
		} catch (error) {
			console.error('runSendDailyDealsTask: ', error);
		}
	}
}

async function updateDailyDealsCache() {
	const activeDailyDeals = await findActiveDailyDeals();
	activeDailyDeals.forEach((deal) => {
		try {
			setCacheDailyDeal(deal);
		} catch (error) {
			console.error(
				'updateDailyDealsCache encountered an error with deal ' + deal.id,
				deal,
				error,
			);
			throw new Error(error.message);
		}
	});
}

async function sendDailyDealToWeedText(recipients: string[], deal: any) {
	try {
		// send transactional sms to each recipient, ideally send to an entire segment in a batch message - review ds api docs
		SMS.send();
	} catch (error: any) {
		throw new Error('sendDailyDealToWeedText: ', error.message);
	}
}
