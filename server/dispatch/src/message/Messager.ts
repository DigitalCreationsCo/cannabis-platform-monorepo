import { type Client, SMSModule } from '@cd/core-lib';

import { FeatureConfig } from '../config/dispatch.features';

class Messager {
	static async sendAll(event: any, recipients: Client[], data: string) {
		recipients.forEach((client) => this.sendMessage(event, client, data));
	}

	static async sendMessage(event: any, client: Client, data: string) {
		FeatureConfig.sms.enabled &&
			this.sendSMS({ event: event, phone: client.phone, data: data });
		FeatureConfig.socket.enabled &&
			client.socketId &&
			this.sendSocketMessage({
				event: event,
				socketId: client.socketId,
				data: data,
			}); // fail silently if no socket
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
		try {
			if (!phone) throw new Error('no phone number provided');
			SMSModule.send(event, phone, data);
		} catch (error) {
			console.error('sendSMS: ', error);
			throw new Error(error.message);
		}
	}

	static async sendSocketMessage({
		event,
		socketId,
		data,
	}: {
		event: any;
		socketId: string;
		data?: string;
	}) {
		console.debug('sendSocketMessage', { event, socketId, data });
		io.to(socketId).emit(event, data);
	}
}

export default Messager;
