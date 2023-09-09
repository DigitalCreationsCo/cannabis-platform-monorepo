export type ClusterMessage = {
	action: RoomAction;
	payload: ClusterMessagePayload;
};

export type RoomAction = 'join-room' | 'leave-room';
export type ClusterMessagePayload = {
	roomId: any;
	client: any;
	order: any;
};

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
