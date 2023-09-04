export interface ClientType {
	socketId: string;
	workerId: number;
	roomId: string;
	userId: string;
}

export class Client implements ClientType {
	socketId: string;
	workerId: number;
	roomId: string;
	userId: string;

	constructor({ socketId, workerId, roomId, userId }: ClientType) {
		this.socketId = socketId;
		this.workerId = workerId;
		this.roomId = roomId;
		this.userId = userId;
	}
}

export class WorkerRoom {
	id: string;
	clients: any;
	workerId: number;
	isDriverSelected = false;

	constructor(_id: string, _client: any, _workerId: number) {
		this.id = _id;
		this.clients = [...this.clients, _client];
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
	userId: string;
	message: string;
	payload: any;
};

export type ClusterMessagePayload = {
	roomId?: any;
	clients?: any;
	order?: any;
};
