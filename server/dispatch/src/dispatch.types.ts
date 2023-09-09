export type SocketMessage = {
	id: string;
	phone: string;
	message?: string;
};

export type ClusterMessage = {
	action: RoomAction;
	payload: ClusterMessagePayload;
};

export type RoomAction =
	| 'join-room'
	| 'leave-room'
	| 'send-message'
	| 'connected-on-worker';

export type ClusterMessagePayload = {
	roomId: string;
	client: ClientType;
	message?: string;
	order?: any;
};

export interface ClientType {
	id: string;
	socketId: string;
	phone: string;
	roomId?: string;
}

export class Client {
	socketId: string;
	roomId: string;
	id: string;
	phone: string;
	constructor({ socketId, roomId, id, phone }: ClientType) {
		this.socketId = socketId;
		this.roomId = roomId || '';
		this.id = id;
		this.phone = phone;
	}
}
