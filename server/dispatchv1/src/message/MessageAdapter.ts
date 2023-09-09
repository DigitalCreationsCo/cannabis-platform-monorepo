import { FeatureConfig } from 'config/dispatch.features';

class MessageAdapter {
	// smsEnabled: boolean;
	// socketEnabled: boolean;
	// constructor(config: FeatureConfigInterface) {
	// 	this.smsEnabled = config.sms.enabled;
	// 	this.socketEnabled = config.socket.enabled;
	// }

	static async sendMessage(room, event, data) {
		await this.send(room, event, data));

        switch (event) {
            case 'new order':
                this.sendAll(room.clients, event)
        }
	}

    static async sendAll(recipients, data) {
        recipients.forEach((client) => {
            FeatureConfig.sms.enabled && (this.sendSMS(client.phone, data));
            FeatureConfig.socket.enabled && (this.sendSocketMessage(getSocketInRoom(client.id), data));
        });
    }

	static async sendSMS(phone, data) {}
    static async sendSocketMessage(socket, data) {}
}

// export default new MessageAdapter(FeatureConfig);
export default MessageAdapter;
