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

interface ClientType {
    socketId: string;
    workerId: string;
    roomId: string;
    userId: string;
}

export {
    Client
};
export type {
    ClientType
};



