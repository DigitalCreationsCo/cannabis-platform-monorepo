import { type OrderWithDispatchDetails } from '@cd/data-access';

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
	| 'accept-order'
	| 'connected-on-worker';

export type RoomType = {
	id: string;
	clients: Client[];
	isClosed: boolean;
};

export type ClusterMessagePayload = {
	roomId: string;
	clients?: ClientType[];
	message?: string;
	order?: OrderWithDispatchDetails['order'];
};

export interface ClientType {
	socketId?: string;
	id: string;
	phone: string;
	roomId?: string;
	orderId?: string;
}

export class Client {
	socketId: string;
	roomId: string;
	id: string;
	phone: string;
	orderId: string;
	constructor({ socketId, roomId, id, phone, orderId }: ClientType) {
		this.socketId = socketId || '';
		this.roomId = roomId || '';
		this.id = id;
		this.phone = phone;
		this.orderId = orderId || '';
	}
}
