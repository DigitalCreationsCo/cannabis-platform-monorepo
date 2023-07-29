interface ClientType {
    socketId: string;
    workerId: number;
    roomId: string;
    userId: string;
}

class Client implements ClientType {
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

class WorkerRoom {
    id: string;
    clients: any;
    workerId: number;

    constructor(_id, _client, _workerId) {
        this.id = _id;
        this.clients = _client;
        this.workerId = _workerId;
    }
}

type ClusterMessage = {
    action: RoomAction;
    data: ClusterMessagePayload;
}

type RoomAction = "test" | "joinUsers" | "leaveUser"

type ClusterMessagePayload = {
    roomId?: any;
    clients?: any;
    order?: any;
}

export {
    Client,
    WorkerRoom
};
export type {
    ClientType,
    ClusterMessage,
    RoomAction,
    ClusterMessagePayload
};



