// import cluster from "cluster";
// import settings from '../../settings'
// import { connectClientController } from "../redis";

import DispatchDA from "data-access";

global.rooms = {};

class WorkerRoomController {

    dataAccess: DispatchDA
    constructor() {
        this.dataAccess;
        (async () => {
            this.dataAccess = new DispatchDA()
        })()
    }
    SendToMaster(_command, _data) {
        process.send({ act: _command, data: _data });
    }

    async JoinRoom(room, socketIdList) {
        console.log("socket list: ", socketIdList);
        let socketId;
        console.log("sockets from adapter: ", await global.io.sockets.adapter);
        for (socketId of socketIdList) {
        console.log("socket id to join: ", socketId);
        console.log("room to join: ", room);

        // await global.io.sockets.adapter.remoteJoin(socketId, room);
        await global.io.sockets.adapter.sockets;
        }
    }

    static DeleteRoom(_roomId) {}
}

export default new WorkerRoomController();
