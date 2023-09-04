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

	constructor(_socketId: any, _workerId: any, _roomId: any, _userId: any) {
		this.socketId = _socketId;
		this.workerId = _workerId;
		this.roomId = _roomId;
		this.userId = _userId;
	}
}

export class WorkerRoom {
	id: string;
	clients: any;
	workerId: number;

	constructor(_id: string, _client: any, _workerId: number) {
		this.id = _id;
		this.clients = _client;
		this.workerId = _workerId;
	}
}

export type ClusterMessage = {
	action: RoomAction;
	data: ClusterMessagePayload;
};

export type RoomAction = 'test' | 'joinUsers' | 'leaveUser';

export type ClusterMessagePayload = {
	roomId?: any;
	clients?: any;
	order?: any;
};
