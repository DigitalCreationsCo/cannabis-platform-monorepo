import Telnyx from 'telnyx';
import { dispatchEvents } from '../../../';

class TelnyxApi {
	telnyx: any;
	constructor(apiKey: string) {
		if (!apiKey) throw new Error(`Telnyx API key is required.`);
		this.telnyx = Telnyx(apiKey);
	}

	async send(event: keyof typeof dispatchEvents, to: string, data: string) {
		const from = getIncomingPhoneNumberForMessageEvent(event);
		console.info('send: ', { event, from, to, data });
		await this.telnyx.messages
			.create({
				// Automatically detect if an SMS message is unusually long and exceeds a recommended limit of message parts.
				auto_detect: true,
				type: 'SMS',
				from: from,
				to: to,
				text: data,

				// Unique identifier for a messaging profile.
				messaging_profile_id: '40018a9f-a235-49ba-a679-a229ed9be835',
				use_profile_webhooks: false,
				webhook_url:
					process.env.NODE_ENV === 'production'
						? `${
								process.env.NEXT_PUBLIC_SERVER_DISPATCH_URL
						  }${getWebhookPathForEvent(event)}`
						: `https://4402-2601-985-680-89f0-c5bc-3880-cba4-c9e7.ngrok-free.app${getWebhookPathForEvent(
								event,
						  )}`,
				webhook_failover_url:
					process.env.NODE_ENV === 'production'
						? `${
								process.env.NEXT_PUBLIC_SERVER_DISPATCH_URL
						  }${getWebhookPathForEvent(event)}`
						: `https://4402-2601-985-680-89f0-c5bc-3880-cba4-c9e7.ngrok-free.app${getWebhookPathForEvent(
								event,
						  )}`,
			})
			.catch((error: any) => {
				console.error('TelnyxApi.send: ', error);
				console.log('errors: ', error.raw.errors);
			});
	}
}

function getIncomingPhoneNumberForMessageEvent(
	event: keyof typeof dispatchEvents,
): string {
	// eslint-disable-next-line sonarjs/no-small-switch
	switch (event) {
		case dispatchEvents.new_order:
			return process.env.TELNYX_PHONE_NUMBER_DRIVER_NEW_ORDER as string;
		case dispatchEvents.order_assigned:
			return process.env.TELNYX_PHONE_NUMBER_DRIVER_NEW_ORDER as string;
		case dispatchEvents.order_assigned_to_another_driver:
			return process.env.TELNYX_PHONE_NUMBER_DRIVER_NEW_ORDER as string;
		default:
			console.info(
				'getIncomingPhoneNumberForMessageEvent: unhandled event ',
				event,
			);
			return '';
	}
}

export function getWebhookPathForEvent(event: keyof typeof dispatchEvents) {
	switch (event) {
		case dispatchEvents.new_order:
			return `/sms/driver-new-order`;
		case dispatchEvents.order_assigned:
			return `/sms/driver-order-assigned`;
		case dispatchEvents.order_assigned_to_another_driver:
			return `/sms/driver-order-assigned-to-another-driver`;
		default:
			console.info('getWebhookUrlForEvent: unhandled event ', event);
			return '';
	}
}

export function getMessagingProfileFromEvent(
	event: keyof typeof dispatchEvents,
) {
	console.info('getMessagingProfileFromEvent: ', event);
	switch (event) {
		case dispatchEvents.new_order:
			return '40018a9f-a235-49ba-a679-a229ed9be835';
		case dispatchEvents.order_assigned:
			return '40018aa4-b4b5-4c91-b3b1-745bc109e59f';
	}
}

export type SMSAPI = {
	send: typeof TelnyxApi.prototype.send;
};

const telnyxApi = new TelnyxApi(process.env.TELNYX_API_KEY as string);
export default telnyxApi;
