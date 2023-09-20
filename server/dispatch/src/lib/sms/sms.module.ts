/* eslint-disable @typescript-eslint/naming-convention */
import { type dispatchEvents } from '../../message';
import { type SMSAPI } from './Telnyx/telnyx';

class SMSModule {
	apiName: 'TextGrid' | 'Telnyx';
	smsApi: SMSAPI | undefined;
	constructor(apiName: 'TextGrid' | 'Telnyx') {
		switch (apiName) {
			case 'TextGrid':
				import('./TextGrid/textgrid').then(
					(TextGrid) => (this.smsApi = TextGrid.default),
				);
				break;
			case 'Telnyx':
				import('./Telnyx/telnyx').then(
					(Telnyx) => (this.smsApi = Telnyx.default),
				);
				break;
			default:
				console.info('SMSModule: unhandled apiName ', apiName);
		}
		this.apiName = apiName;
	}
	async send(
		event: keyof typeof dispatchEvents,
		phoneTo: string,
		data: string,
	) {
		try {
			// data += `\nReply STOP to unsubscribe. Msg&Data Rates May Apply.`;
			console.info(
				`sending sms message to ${phoneTo} using ${this.apiName} api: "${data}"`,
			);
			const to = `+1${phoneTo}`;
			this.smsApi?.send(event, to, data);
		} catch (error) {
			console.error('SMSModule.send: ', error);
		}
	}
}

export default new SMSModule('Telnyx');
