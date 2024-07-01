import { Twilio as TwilioClient, getExpectedTwilioSignature } from 'twilio';
class Twilio {
	private t: TwilioClient;
	private broadcastServiceSid: string =
		process.env.TWILIO_DAILY_DEALS_SERVICE_SID ?? '';

	constructor(account: string, token: string) {
		if (!account || !token) {
			throw new Error('Could not initialize Twilio.');
		}
		if (!process.env.TWILIO_DAILY_DEALS_SERVICE_SID) {
			throw new Error('Twilio Daily Deals Service SID is missing!');
		}
		this.t = new TwilioClient(account, token, {
			maxRetries: 2,
			autoRetry: true,
		});
	}

	async send(to: string, message: string) {
		try {
			await this.t.messages.create({
				body: message,
				messagingServiceSid: this.broadcastServiceSid,
				to,
			});
		} catch (error) {
			console.error('Error sending message', error);
		}
	}

	async sendAll(numbers: string[], message: string) {
		// USE FRESHSALES DATA FOR NOW, WHEN SCALING TO 1000+ CONTACTS, USE SEGMENT AUDIENCE
		// or customer.io
		numbers.forEach((number) => {
			this.t.messages
				.create({
					body: message,
					messagingServiceSid: this.broadcastServiceSid,
					to: number,
				})
				.then((message) => console.log(message.status))
				.catch((error) => console.error(error))
				.finally(() => console.log('Message sent to: ', number));
		});
	}

	async inviteCustomer() {
		return;
	}

	async provisionSMSPhoneNumber(slug: string): Promise<string> {
		// provision new phone number and return;
		const numbers = await this.t
			.availablePhoneNumbers('US')
			.tollFree.list({ smsEnabled: true, voiceEnabled: false, limit: 1 });
		if (numbers[0]?.phoneNumber === undefined) {
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
		if (numbers[0]?.phoneNumber === undefined) {
			throw new Error('No phone numbers available');
		}
		return numbers[0].phoneNumber;
	}

	generateTwilioSignature(url: string) {
		return getExpectedTwilioSignature(
			process.env.TWILIO_AUTH_TOKEN as string,
			url,
			{}
		);
	}
}

const accountSid = process.env.TWILIO_ACCOUNT_SID ?? '';
const authToken = process.env.TWILIO_AUTH_TOKEN ?? '';

export default new Twilio(accountSid, authToken);
