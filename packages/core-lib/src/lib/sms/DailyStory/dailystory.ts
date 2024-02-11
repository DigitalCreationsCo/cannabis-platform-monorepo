/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios';
import { dispatchEvents } from '../../..';

class SMSModule {
	smsApi: 'DailyStory';
	constructor(smsApi: 'DailyStory') {
		this.smsApi = smsApi;
	}
	async send(
		event: keyof typeof dispatchEvents,
		phoneTo: string,
		data: string,
	) {
		try {
			// data += `\nReply STOP to unsubscribe. Msg&Data Rates May Apply.`;
			console.info(
				`sending sms message to ${phoneTo} using ${this.smsApi} api: "${data}"`,
			);
			const from = getIncomingPhoneNumberForMessageEvent(event);
			const to = `+1${phoneTo}`;
			await axios.post(
				process.env.NEXT_PUBLIC_DAILYSTORY_API_URL as string,
				{
					body: data,
					from,
					to,
				},
				{
					headers: {
						Authorization: `Bearer ${process.env.DAILYSTORY_API_KEY}`,
						'Content-type': 'application/json',
					},
				},
			);
		} catch (error) {
			console.error('dailystory.send: ', error);
		}
	}
}

/**
 * Allows for sending from different numbers based on message event, useful for some sms platforms
 * @param event
 * @returns
 */
function getIncomingPhoneNumberForMessageEvent(
	event: keyof typeof dispatchEvents,
) {
	// eslint-disable-next-line sonarjs/no-small-switch
	switch (event) {
		case dispatchEvents.new_order:
			// return process.env.PHONE_NUMBER_DRIVER_ACCEPT_ORDER;
			return getDailyStoryPhoneNumber();
		case dispatchEvents.order_assigned:
			// return process.env.PHONE_NUMBER_DRIVER_ASSIGN_ORDER;
			return getDailyStoryPhoneNumber();
		case dispatchEvents.order_assigned_to_another_driver:
			// return process.env.PHONE_NUMBER_DRIVER_ASSIGN_ORDER;
			return getDailyStoryPhoneNumber();
		default:
			console.info(
				'getIncomingPhoneNumberForMessageEvent: unhandled event ',
				event,
			);
	}
}

function getDailyStoryPhoneNumber() {
	return ``;
}

export default new SMSModule('DailyStory');
