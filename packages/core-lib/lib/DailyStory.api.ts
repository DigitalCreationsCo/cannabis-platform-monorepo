/* eslint-disable @typescript-eslint/naming-convention */
import api from 'api';

class DailyStoryApi {
	dailyStory: any;

	constructor() {
		try {
			this.dailyStory = api('@dailystory/v1.0#4lnujl1malwkj');
		} catch (e) {
			console.error('DailyStoryApi: ', e);
		}
	}

	async createContact({
		email,
		firstName,
		lastName,
		phone,
	}: {
		email: string;
		firstName: string;
		lastName: string;
		phone: string;
	}) {
		try {
			return await this.dailyStory.createOrEditAContact1({
				email,
				'mobile phone': phone,
				extendedProperties: {
					firstName,
					lastName,
				},
			});
		} catch (e) {
			console.error('DailyStoryApi.createContact: ', e);
			throw new Error(e);
		}
	}
}

const dailyStoryApi = new DailyStoryApi();
export { dailyStoryApi };
