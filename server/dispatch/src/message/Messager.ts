import { FeatureConfig } from '../config/dispatch.features';
import { type ClientType } from '../dispatch.types';
import SMSModule from '../lib/sms';

class Messager {
	static async sendAll(event: any, recipients: ClientType[], data: string) {
		recipients.forEach((client) => this.sendMessage(event, client, data));
	}

	static async sendMessage(event: any, client: ClientType, data: string) {
		FeatureConfig.sms.enabled &&
			this.sendSMS({ event: event, phone: client.phone, data: data });
		FeatureConfig.socket.enabled &&
			client.socketId &&
			this.sendSocketMessage({ socketId: client.socketId, data: data }); // fail silently if no socket
	}

	static async sendSMS({
		event,
		phone,
		data,
	}: {
		event: any;
		phone: string;
		data: string;
	}) {
		SMSModule.send(event, phone, data);
	}

	static async sendSocketMessage({
		socketId,
		data,
	}: {
		socketId: string | undefined;
		data: string;
	}) {
		console.info('sending socket message to ' + socketId + ': ' + data);
	}
}

export default Messager;
