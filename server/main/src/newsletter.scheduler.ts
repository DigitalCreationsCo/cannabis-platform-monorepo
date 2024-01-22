import { schedule } from 'node-cron';

export default class NewsletterScheduler {
	static start() {
		this.runScheduleNewsLetterCampaignTask();
	}

	static async runScheduleNewsLetterCampaignTask() {
		try {
			// run this task every day sunday at 9am
			schedule('0 9 * * 0', () => {
				updateDailyDealsCache();
			});
			console.info('Scheduled: newsletter campaign create task.');
		} catch (error) {
			console.error('runScheduleNewsLetterCampaignTask: ', error);
			// send an alert email if this fails
		}
	}
}
