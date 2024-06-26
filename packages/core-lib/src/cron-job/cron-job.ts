/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable sonarjs/no-duplicate-string */
import { type DailyDeal } from '@cd/data-access';
import { axios } from '../axiosInstance';
import Twilio from '../sms/twilio';
import { urlBuilder } from '../utils';

const folders = {
	"daily-deals": 36202,
	events: 36049,
}

const METHODS = {
	GET: 0,
	POST: 1,
	OPTIONS: 2,
	HEAD: 3,
	PUT: 4,
	DELETE: 5,
	TRACE: 6,
	CONNECT: 7,
	PATCH: 8,
};	


class CronJobApi {
	constructor() {
		if (!process.env.CRON_API_KEY) {
			throw new Error('Cron API Key is missing!');
		}
		if (!process.env.TWILIO_DAILY_DEALS_SERVICE_URL) {
			throw new Error('Twilio Daily Deals Service URL is missing!');
		}
		if (!process.env.TWILIO_AUTH_TOKEN) {
			throw new Error('Twilio Auth Token is missing!');
		}
	}

	/**
	 * Create a new cron job
	 * @returns {Promise<string>} job Id
	 */
	async createDailyDealJob(deal: DailyDeal): Promise<string> {
		const { teamSlug, schedule, endTime, timezone } = deal;
		const [minutes, hours, mdays, months, wdays] = schedule
			.split(' ')
			.reduce((arr, t) => {
				t = t.replace(/\*/g, '-1');
				arr.push([t]);
				return arr;
			}, [] as string[][]);

		const serviceUrl = `process.env.TWILIO_DAILY_DEALS_SERVICE_URL?segment=${deal.weedTextSegmentId}`;
		const response = await axios.put<{ jobId: string }>(
			`https://api.cron-job.org/jobs`,
			{
				job: {
					title: `daily-deal-${teamSlug}-${new Date().toISOString()}`,
					enabled: true,
					folderId: 36202,
					schedule: {
						timezone,
						minutes,
						hours,
						mdays,
						months,
						wdays,
						expiresAt: endTime || 0,
					},
					url: serviceUrl,
					notification: {
						onFailure: true,
						onSuccess: true,
						onDisable: true,
					},
					requestMethod: '1', // POST
					headers: {
						'X-Twilio-Signature': Twilio.generateTwilioSignature(serviceUrl),
					},
					body: JSON.stringify(deal.message),
				},
			},
			{
				headers: {
					Authorization: `Bearer ${process.env.CRON_API_KEY}`,
					'Content-Type': 'application/json',
				},
			}
		);
		const { jobId } = response.data;
		return jobId;
	}

	/**
	 * Update cron job
	 */
	async updateDailyDealJob(jobId: string, deal: DailyDeal) {
		const { teamSlug, schedule, endTime, timezone } = deal;
		const [minutes, hours, mdays, months, wdays] = schedule
			.split(' ')
			.reduce((arr, t) => {
				t = t.replace(/\*/g, '-1');
				arr.push([t]);
				return arr;
			}, [] as string[][]);

		const serviceUrl = `process.env.TWILIO_DAILY_DEALS_SERVICE_URL?segment=${deal.weedTextSegmentId}`;

		await axios.patch<{ jobId: string }>(
			`https://api.cron-job.org/jobs/${jobId}`,
			{
				job: {
					title: `daily-deal-${teamSlug}-${new Date().toISOString()}`,
					enabled: true,
					folderId: 36202,
					schedule: {
						timezone,
						minutes,
						hours,
						mdays,
						months,
						wdays,
						expiresAt: endTime || 0,
					},
					url: serviceUrl,
					notification: {
						onFailure: true,
						onSuccess: true,
						onDisable: true,
					},
					requestMethod: '1', // POST
					headers: {
						'X-Twilio-Signature': Twilio.generateTwilioSignature(serviceUrl),
					},
					body: JSON.stringify(deal.message),
				},
			},
			{
				headers: {
					Authorization: `Bearer ${process.env.CRON_API_KEY}`,
					'Content-Type': 'application/json',
				},
			}
		);
	}

	/**
	 * Delete cron job
	 */
	async deleteDailyDealJob(jobId: string) {
		await axios.delete<{ jobId: string }>(
			`https://api.cron-job.org/jobs/${jobId}`,
			{
				headers: {
					Authorization: `Bearer ${process.env.CRON_API_KEY}`,
					'Content-Type': 'application/json',
				},
			}
		);
	}

	// EVENTS

	async createGetEventsByLocationJob(location: string): Promise<string> {
		const response = await axios.put<{ jobId: string }>(
			`https://api.cron-job.org/jobs`,
			{
				job: {
					title: `update-events-${location}`,
					enabled: true,
					folderId: folders.events,
					schedule: '0 0 1 * *',
					url: urlBuilder.shop + `/api/events?location=${location}`,
					notification: {
						onFailure: true,
						onSuccess: true,
						onDisable: true,
					},
					requestMethod: METHODS.POST,
					extendedData: {
						headers: {
							'Authorization': `Bearer ${process.env.NEXTAUTH_SECRET}`,
						}
					},
				},
			},
			{
				headers: {
					Authorization: `Bearer ${process.env.CRON_API_KEY}`,
					'Content-Type': 'application/json',
				},
			}
		);
		const { jobId } = response.data;
		return jobId;
	}

}

export default new CronJobApi();

// old code using app /send endpoint
// await axios.patch<{ jobId: string }>(
// 	`https://api.cron-job.org/jobs/${update.jobId}`,
// 	{
// 		job: {
// 			title: `Daily Deal ${teamSlug}: ${id}-${startTime}`,
// 			enabled: true,
// 			folderId: 36202,
// 			schedule: {
// 				timezone,
// 				minutes,
// 				hours,
// 				mdays,
// 				months,
// 				wdays,
// 				expiresAt: endTime || 0,
// 			},
// 			url: `${process.env.NEXT_PUBLIC_DASHBOARD_APP_URL}/api/dispensaries/${teamSlug}/daily-deals/send`,
// 			notification: {
// 				onFailure: true,
// 				onSuccess: true,
// 				onDisable: true,
// 			},
// 			requestMethod: 'POST',
// 			headers: { Authorization: `Bearer ${process.env.NEXTAUTH_SECRET}` },
// 			body: dailyDealUpdated,
// 		},
// 	},
// 	{
// 		headers: {
// 			Authorization: `Bearer ${process.env.CRON_API_KEY}`,
// 			'Content-Type': 'application/json',
// 		},
// 	},
// );
