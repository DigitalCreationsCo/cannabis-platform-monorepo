/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios';
import { dispatchEvents } from '../../../src';

class SMSModule {
	smsApi: 'TextGrid' | 'Telnyx';
	constructor(smsApi: 'TextGrid') {
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
				`${process.env.TEXTGRID_BASE_URL}/Accounts/${process.env.TEXTGRID_ACCOUNT_SID}/Messages.json`,
				{
					body: data,
					from,
					to,
				},
				{
					headers: {
						Authorization:
							'Bearer ' +
							Buffer.from(
								`${process.env.TEXTGRID_ACCOUNT_SID}:${process.env.TEXTGRID_AUTHTOKEN}`,
							).toString('base64'),
						'Content-type': 'application/json',
					},
				},
			);
		} catch (error) {
			console.error('SMSModule.send: ', error);
		}
	}
}

function getIncomingPhoneNumberForMessageEvent(
	event: keyof typeof dispatchEvents,
) {
	// eslint-disable-next-line sonarjs/no-small-switch
	switch (event) {
		case dispatchEvents.new_order:
			return process.env.PHONE_NUMBER_DRIVER_ACCEPT_ORDER;
		case dispatchEvents.order_assigned:
			return process.env.PHONE_NUMBER_DRIVER_ASSIGN_ORDER;
		case dispatchEvents.order_assigned_to_another_driver:
			return process.env.PHONE_NUMBER_DRIVER_ASSIGN_ORDER;
		default:
			console.info(
				'getIncomingPhoneNumberForMessageEvent: unhandled event ',
				event,
			);
	}
}
export default new SMSModule('TextGrid');

export type TextGridReturnMessagePayload = {
	SmsMessageSid?: string;
	NumMedia?: string;
	SmsSid?: string;
	SmsStatus?: string;
	Body: string;
	To?: string;
	NumSegments?: string;
	MessageSid?: string;
	AccountSid?: string;
	From: string;
	ApiVersion?: string;
};
