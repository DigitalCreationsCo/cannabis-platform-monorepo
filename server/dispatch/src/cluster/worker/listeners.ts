const WorkerRoomsControl = require("./worker-rooms-control");
// import WorkerRoomController from '../worker/workerroom.controller'
// import { WorkerRoom } from "types";
import { ClusterMessage } from "types";

class WorkerListeners {
  constructor() {
    process.on("message", (_msg: ClusterMessage) => {
      console.info("message: ", _msg);
      let { roomId, clients, order } = _msg.data;
      let client;
      switch (_msg.action) {
        case "test":
          console.info("room on worker redis test: ", global.rooms);
          break;
        // case "dispatch:SELECT_DRIVER":
        //   WorkerRoomsControl.CreateSelectDriverRoom(order);
        //   break;
        case "joinUsers":
          break;
        case "leaveUser":
          break;
      }
    });
  }
}

export { WorkerListeners };

