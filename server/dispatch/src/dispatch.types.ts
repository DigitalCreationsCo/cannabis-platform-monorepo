export interface ClientType {
	userId: string;
	socketId: string;
	phone: string;
	workerId: number;
	roomId: string;
}

export class Client {
	socketId: string;
	workerId: number;
	roomId: string;
	userId: string;
	phone: string;
	constructor({ socketId, workerId, roomId, userId, phone }: ClientType) {
		this.socketId = socketId;
		this.workerId = workerId;
		this.roomId = roomId;
		this.userId = userId;
		this.phone = phone;
	}
}

export class WorkerRoom {
	id: string;
	clients: Client[];
	workerId: number;
	isDriverSelected = false;

	constructor(_id: string, _client: any, _workerId: number) {
		this.id = _id;
		this.clients = [_client];
		this.workerId = _workerId;
	}
}

export type ClusterMessage = {
	action: RoomAction;
	data: ClusterMessagePayload;
};

export type RoomAction = 'test' | 'joinUsers' | 'leaveUser';

export type SocketMessage = {
	event: string;
	phone: string;
	userId: string;
	message: string;
	payload: any;
};

export type ClusterMessagePayload = {
	roomId?: any;
	clients?: any;
	order?: any;
};
