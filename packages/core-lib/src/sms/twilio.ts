import { Twilio as TwilioClient, getExpectedTwilioSignature } from 'twilio';
class Twilio {
	private t: TwilioClient;
	constructor(account, token) {
		if (!account || !token) {
			throw new Error('Could not initialize Twilio.');
		}
		this.t = new TwilioClient(account, token, {
			maxRetries: 2,
			autoRetry: true,
		});
	}

	async send() {}

	async sendAll() {
		// USE FRESHSALES DATA FOR NOW, WHEN SCALING TO 1000+ CONTACTS, USE SEGMENT AUDIENCE
		// this.t.notify.v1.services().
	}

	async optInCustomer() {}

	async provisionSMSPhoneNumber(slug: string): Promise<string> {
		// provision new phone number and return;
		const numbers = await this.t
			.availablePhoneNumbers('US')
			.tollFree.list({ smsEnabled: true, voiceEnabled: false, limit: 1 });
		if (!numbers || numbers.length === 0) {
			throw new Error('No phone numbers available');
		}
		await this.t.incomingPhoneNumbers.create({
			friendlyName: slug,
			phoneNumber: numbers[0].phoneNumber,
		});
		return numbers[0].phoneNumber;
	}

	async getPhoneNumberBySlug(slug: string) {
		const numbers = await this.t.incomingPhoneNumbers.list({
			friendlyName: slug,
		});
		if (!numbers || numbers.length === 0) {
			throw new Error('No phone numbers available');
		}
		return numbers[0].phoneNumber;
	}

	generateTwilioSignature(url: string) {
		return getExpectedTwilioSignature(process.env.TWILIO_AUTH_TOKEN, url, {});
	}
}

export default new Twilio(
	process.env.TWILIO_ACCOUNT_SID,
	process.env.TWILIO_AUTH_TOKEN,
);
