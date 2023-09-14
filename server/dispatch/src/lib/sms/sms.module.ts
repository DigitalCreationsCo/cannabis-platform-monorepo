import axios from 'axios';

class SMSModule {
	smsApi: 'TextGrid';
	constructor(smsApi: 'TextGrid') {
		this.smsApi = smsApi;
	}
	async send(phoneTo: string, data: string) {
		// data += `\nReply STOP to unsubscribe. Msg&Data Rates May Apply.`;
		console.info(
			`sending sms message to ${phoneTo} using ${this.smsApi} api: ${data}`,
		);
		await axios.post(
			`${process.env.TEXTGRID_BASE_URL}/Accounts/${process.env.TEXTGRID_ACCOUNT_SID}/Messages.json`,
			{
				body: data,
				// "from" : "{number to send SMS from, eg, +1xxxxxxxxxx}", - required
				to: phoneTo,
			},
			{
				headers: {
					Authorization:
						'Bearer' +
						Buffer.from(
							process.env.TEXTGRID_ACCOUNT_SID +
								':' +
								process.env.TEXTGRID_AUTHTOKEN,
							'base64',
						).toString('ascii'),
				},
			},
		);
	}
}

export default new SMSModule('TextGrid');
