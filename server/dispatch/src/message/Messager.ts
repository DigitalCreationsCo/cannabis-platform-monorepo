import { FeatureConfig } from '../config/dispatch.features';
import { type ClientType } from '../dispatch.types';
import SMSModule from '../lib/sms';

class Messager {
	static async sendAll(recipients: ClientType[], data: string) {
		recipients.forEach((client) => this.sendMessage(client, data));
	}

	static async sendMessage(client: ClientType, data: string) {
		FeatureConfig.sms.enabled && this.sendSMS(client.phone, data);
		FeatureConfig.socket.enabled &&
			client.socketId &&
			this.sendSocketMessage(client.socketId, data); // fail silently if no socket
	}

	static async sendSMS(phone: string, data: string) {
		SMSModule.send(phone, data);
	}
	static async sendSocketMessage(socketId: string, data: string) {
		console.info('sending socket message to ' + socketId + ': ' + data);
	}
}

export default Messager;
