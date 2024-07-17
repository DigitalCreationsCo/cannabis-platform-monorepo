import { Twilio as TwilioClient, getExpectedTwilioSignature } from 'twilio';
class Twilio {
	private t: TwilioClient;
	private broadcastServiceSid: string = 'MGf231455c8497f2af927c66d46e062c7c';
	private inviteServiceSide = 'MGf231455c8497f2af927c66d46e062c7c';

	constructor(account: string, token: string) {
		if (!account || !token) {
			throw new Error('Could not initialize Twilio.');
		}
		this.t = new TwilioClient(account, token, {
			maxRetries: 2,
			autoRetry: true,
		});
	}

	async send(to: string, text: string) {
		this.t.messages
			.create({
				body: text,
				messagingServiceSid: this.broadcastServiceSid,
				// applicationSid: '' // if i cant make this work with sdk, use REST
				to,
			})
			.then((message) => {
				console.log('TWILIO - send to: ', to);
				console.log('TWILIO - status: ', message.status);
			})
			.catch((error) => {
				console.error('TWILIO - send ERROR: ', error);
				throw new Error(error);
			});
	}

	async sendAll(numbers: string[], text: string) {
		// USE FRESHSALES DATA FOR NOW, WHEN SCALING TO 1000+ CONTACTS, USE SEGMENT AUDIENCE
		// or customer.io
		numbers.forEach((number) => {
			this.t.messages
				.create({
					body: text,
					messagingServiceSid: this.broadcastServiceSid,
					to: number,
				})
				.then((message) => {
					console.log('TWILIO - send all to: ', number);
					console.log('TWILIO - status: ', message.status);
				})
				.catch((error) => {
					console.error('TWILIO - send all ERROR: ', error);
					throw new Error(error);
				});
		});
	}

	async inviteCustomer(to: string, text: string) {
		this.t.messages
			.create({
				body: text,
				messagingServiceSid: this.inviteServiceSide,
				to,
			})
			.then((message) => {
				console.log('TWILIO - invite to: ', to);
				console.log('TWILIO - status: ', message.status);
			})
			.catch((error) => {
				console.error('TWILIO - invite ERROR: ', error);
				throw new Error(error);
			});
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
