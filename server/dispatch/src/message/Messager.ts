import { FeatureConfig } from '../config/dispatch.features';

class Messager {
	static async send(recipients, data) {
		recipients.forEach((client) => this.sendMessage(client, data));
	}

	static async sendMessage(client, data) {
		FeatureConfig.sms.enabled && this.sendSMS(client.phone, data);
		FeatureConfig.socket.enabled && this.sendSocketMessage(client.socket, data); // fail silently if no socket
	}

	static async sendSMS(phone, data) {}
	static async sendSocketMessage(socket, data) {}
}

export default Messager;
