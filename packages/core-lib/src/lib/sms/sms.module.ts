/* eslint-disable @typescript-eslint/naming-convention */
import { TextContent, type dispatchEvents } from '../../';
import { type SMSAPI } from './Telnyx/telnyx';

class SMSModule {
	apiName: SMSApiProvider;
	smsApi: SMSAPI | undefined;
	constructor(apiName: SMSApiProvider) {
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
			case 'DailyStory':
				import('./DailyStory/dailystory').then(
					(DailyStory) => (this.smsApi = DailyStory.default),
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
			data += `\n${TextContent.info.CONTACT_SUPPORT}`;
			data += `\n${TextContent.info.SMS_FOOTER}`;
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

export default new SMSModule('DailyStory');

type SMSApiProvider = 'TextGrid' | 'Telnyx' | 'DailyStory';
