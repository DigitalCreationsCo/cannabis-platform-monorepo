// import cluster from "cluster";
// import settings from "../../settings";
import { connectClientController } from '../redis';
// import { Client } from '../../types'
import DispatchDA from '../../data-access';
import ClusterInit from './clusterInit';

global.rooms = {};
global.lastWorkerId = 0;

class MasterRoomController {
    
    dispatchDataAccess: typeof DispatchDA;
    
    constructor() {
      return (async () => {
        this.initDispatchDataAccessModule()
        // .then(() => 
        // this.dispatchDataAccess.dispatchOrdersChangeStream);
        
      })() as unknown as MasterRoomController;
      }

      async initDispatchDataAccessModule () {
        import('../../data-access').then(async ({ default: DispatchDA }) => {
          this.dispatchDataAccess = await DispatchDA;
        }).then(() => {
          console.log(!!this.dispatchDataAccess.dispatchOrdersChangeStream)
          this.dispatchDataAccess.dispatchOrdersChangeStream.on("change", async (change) => {
            console.info("change event:");

            const 
            dispatchOrder = change.fullDocument;

            let
            { orderId, driver } = dispatchOrder;

            switch (change.operationType) {

              case "insert":
              if (_.isEmpty(driver))
                  // get order
                  // select driver for order
                  // subscribe drivers to socket room
                  // determine the selected driver
                  // subscribe the selected driver to order socket room `delivery-<orderId>`
                  // console.log("order inserted");
              this.createSelectDriverRoom(dispatchOrder);

              break;

              case "update":
              if (!dispatchOrder.driver)
              console.log("pending Order needs assigned driver.");
                  // ClusterInit.SendToWorker(
                  //   global.lastWorkerId,
                  //   "dispatch:SELECT_DRIVER",
                  //   { order }
                  // );
              
              break;

              default:
              console.log("unhandled dispatch change event: ", change.operationType);
            }
          });
        });
      }

  // static SubscribeToRoom(
  //   _socketId,
  //   _orderId
  //   //_namespace,
  //   // _roomId
  // ) {
  //   // iterate over all global rooms in master,
  //   let roomId;
  //   for (roomId in global.rooms) {
  //     // if room exists for orderId, (must be added in delivery namespace)
  //     if (global.io.sockets.adapter.rooms[roomId] === _orderId) {
  //       // join this room
  //       return this.JoinRoom(
  //         _socketId,
  //         global.rooms[roomId].workerId,
  //         roomId,
  //         (_client) => {
  //           global.rooms[roomId].clients[_socketId] = _client;
  //         }
  //       );
  //     }
  //   }

  //   roomId = _orderId;
  //   if (++global.lastWorkerId >= settings.numCPUs) {
  //     global.lastWorkerId = 0;
  //   }
  //   return this.JoinRoom(_socketId, global.lastWorkerId, roomId, (_client) => {
  //     // create new empty room on master global rooms
  //     // possibly use status property ? for handling
  //     global.rooms[roomId] = {
  //       workerId: global.lastWorkerId,
  //       clients: {},
  //     };
  //     global.rooms[roomId].clients[_client.socketId] = _client;
  //     console.log(
  //       "MASTER: create new room " +
  //         roomId +
  //         " on worker " +
  //         global.lastWorkerId
  //     );
  //     console.log("global rooms? ", global.rooms);
  //   });
  // }

  // static JoinRoom(
  //   _socketId,
  //   _workerId,
  //   // _namespace,
  //   _roomId,
  //   _callback
  // ) {
  //   const client = new Client(
  //     _socketId,
  //     _workerId,
  //     _roomId
  //     //_namespace
  //   );
  //   global.io.sockets.sockets.get(_socketId).adapter.remoteJoin(
  //     _socketId,
  //     _roomId,
  //     // _namespace,
  //     function (err) {
  //       if (err) {
  //         console.log("Error MASTER: remote join client " + _socketId);
  //       } else {
  //         console.log("MASTER: client " + _socketId + " join in " + _roomId);
  //         _callback(client);
  //       }
  //     }
  //   );
  //   return client;
  // }

  async createSelectDriverRoom(order) {
    // console.log("selecting driver for dispatch order..");
    // console.log("order: ", order);
    let {
        vendor: { location },
        orderId,
      } = order,
      room = `select-driver:${orderId}`;
    // console.log(
    //   "data access: ",
    //   await this.dispatchDataAccess.findDriverIdsWithinRange(location)
    // );
    // console.log(
    //   "selected drivers: ",
    //   await this.dispatchDataAccess.findDriverIdsWithinRange(location)
    // );
    const selectedDriverIds =
      await this.db.findDriverIdsWithinRange(location);
    const selectDriverSocketIdList =
      await connectClientController.getSocketFromDriverIds(selectedDriverIds);
    // console.log(
    //   "selectDriverSocketIdList length: ",
    //   selectDriverSocketIdList.length
    // );
    if (selectDriverSocketIdList.length > 0) {
      // console.log(
      //   "MASTER: " +
      //     process.pid +
      //     " dispatch order to " +
      //     selectDriverSocketIdList.length +
      //     (selectDriverSocketIdList.length > 1 ? "drivers." : " driver.")
      // );
      // console.log("socketId list: ", selectDriverSocketIdList);
      this.joinRoom(room, selectDriverSocketIdList);
    } else {
      // console.log("MASTER: " + process.pid + " dispatch order to 0 drivers ");
      // possible recursive call here
    }
  }

  async joinRoom(room, socketIdList) {
    let socketId;
    for (socketId of socketIdList) {
      // console.log("socket id to join: ", socketId);
      // console.log("room to join: ", room);
      // console.log("sockets to join room: ", await global.io);
      const socket = await global.io.sockets.sockets.get(socketId);
      // const socket = await global.io.of("/").adapter.sids.get(socketId);
      await socket.join(room);
    }
  }

  static disconnectClientFromRoom(_client) {
    if (global.rooms[_client.roomId] != null) {
        ClusterInit.SendToWorker(
        global.rooms[_client.roomId].workerId,
        "leaveUser",
        _client
      );
      this.deleteClientFromRoomOnMaster(_client);
    }
    console.log(
      "MASTER: client " +
        _client.socketId +
        " was disconnected from room " +
        _client.roomId
    );
  }

  static clientSendToWorker(_client, _act, _data) {
    // is used to send new socketconnections to an existing room
    ClusterInit.SendToWorker(
      global.rooms[_client.roomId].workerId,
      _act,
      [_client, _data]
    );
  }

  static deleteClientFromRoomOnMaster(_client) {
    if (global.rooms[_client.roomId] != null) {
      delete global.rooms[_client.roomId].clients[_client.socketId];
    } else {
      console.log(
        "MASTER ERROR: client " +
          _client.socketId +
          " cannot be delete from room " +
          _client.roomId
      );
    }
  }

  async getOrderById(orderId) {
    return await this.db.getOrderById(orderId);
  }

  async addDriverToOrder(orderId, userId) {
    try {
      await this.db.addDriverToOrder(orderId, userId);
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

export default new MasterRoomController();
