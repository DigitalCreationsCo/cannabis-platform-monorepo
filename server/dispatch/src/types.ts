interface ClientType {
    socketId: string;
    workerId: string;
    roomId: string;
    userId: string;
}

class Client implements ClientType{
    socketId: string;
    workerId: string;
    roomId: string;
    userId: string;

    constructor(_socketId, _workerId, _roomId, _userId) {
        this.socketId = _socketId;
        this.workerId = _workerId;
        this.roomId = _roomId;
        this.userId = _userId;
    }
}

class WorkerRoom {
    id: string;
    client: any;
    
    constructor(_id, _client) {
        this.id = _id;
        this.client = _client;
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
    ClusterMessage
};



