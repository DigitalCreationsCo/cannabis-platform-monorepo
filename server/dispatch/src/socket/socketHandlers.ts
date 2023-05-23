import MasterRoomsControl from "../cluster/master/room.controller";
import { connectClientController } from "../cluster/redis";
import { SocketEvents } from "./socketEvents";

global.io.on(SocketEvents.connection, async (socket) => {
  // socket.leaveAll();

  // add conditional to subscribe to different rooms, possibly based on socket event

  // the client variable and the client_connect handler below
  // some overlapping functionality, I think.
  // Be prepared to choose one approach over the other.
  // I favor Redis because it is extensible to multiple node servers

  // const client = MasterRoomsControl.SubscribeToRoom(
  // socket.id;
  // orderId
  // namespace
  // roomId
  // );

  socket.emit(SocketEvents.connection, {
    message: "SERVER: you are connected to dispatch server.",
  });

  socket.on(SocketEvents.clientConnect, async ({ data }) => {
    // console.log("MASTER: connected client " + socket.id);
    // console.log("data: ", data);
    let { userId } = data;
    saveClient(userId, socket.id);
  });

  socket.on("disconnect", async (reason) => {
    console.log("client disconnect, reason: ", reason);
    // MasterRoomsControl.DisconnectClientFromRoom(client);
    socket.removeAllListeners();
  });
  socket.on("error", (e) => {
    // MasterRoomsControl.DisconnectClientFromRoom(client);
    console.log("MASTER ERROR: " + e);
  });

  global.io.of("/").adapter.on("join-room", async (room) => {
    if (room.startsWith("select-driver:")) {
      // const SelectDriverRoomEvents = require("./select-driver-room");
      // new SelectDriverRoomEvents(socket, room);
      // console.log("room joined: ", room);
      // console.log("socket in the room: ", socket.id);

      const roomSize = io.sockets.adapter.rooms.get(room).size;
      // console.log(room + " roomSize: ", roomSize);

      // detect the number of sockets in the room
      // if (numSockets === 0) {
      // close the room
      // and select new Drivers for order request
      // selectDriverForDelivery(order)
      // }

      // const isDriverSelected = false;
      let roomWasOccupied = false;
      let isDriverAdded = false;
      if (roomSize > 0) {
        roomWasOccupied = true;
        let orderId = getOrderIdFromRoom(room);
        // console.log("orderId: ", orderId);
        const order = await MasterRoomsControl.getOrderById(orderId);
        // console.log("order: ", order);
        global.io.to(room).emit(SocketEvents.newOrder, {
          message: "You have received a new order!",
          order: order,
        });
        console.log(
          "dispatching order:" + order + " to " + roomSize + " drivers."
        );

        socket.once("accept_delivery_order", async ({ data }) => {
          // console.log("this socket claimed the order: ", socket.id);
          socket.in(room).emit("order_assigned_to_another_driver", {
            message:
              "You did not claim the order in time! Stay online to receive another order.",
          });
          console.log(
            "server received accept order event for order: ",
            orderId
          );
          const { userId } = data;
          console.log(`driver:${userId} accepted the order:${orderId}.`);
          socket.emit("order_assigned", {
            message: "Navigate to start delivering your order!",
          });
          await MasterRoomsControl.addDriverToOrder(orderId, userId).then(
            () => {
              isDriverAdded = true;
              // add the selected Driver to the order Room.
              // create a new socket connection from client side, to join the room
              global.io.in(room).socketsLeave(room);
            },
            (error) => {
              console.log(error);
            }
          );
          console.log("room " + room + " closed");
        });

        socket.once("decline_delivery_order", () => {
          console.log(`socket ${socket.id} denied the order.`);
          socket.leave(room);
          // if (roomSize === 0) {
          //   // console.log("no driver selected for order. Relaunching dispatch..");
          //   // console.log("socketId: ", socket.id);
          //   // send a new request for this order, to a different batch of drivers.
          // } else {
          //   console.log("room is still occupied.");
          // }
        });
      }
      if (
        roomSize == 0 &&
        roomWasOccupied === true &&
        isDriverAdded === false
      ) {
        console.log("select a new batch of drivers to dispatch order");
      }
    }
  });
});

global.io.of(/^\/order:\w+$/).on(SocketEvents.connection, async (socket) => {
  let namespace = socket.nsp.name;
  // console.log("socket connected to order namespace: ", namespace);
  let orderId = getOrderIdFromRoom(namespace);
  let room = `order:${orderId}`;
  await socket.join(room);

  if (room.startsWith("order:")) {
    // console.log("socket " + socket.id + " joined room: ", room);

    // TODO: When a client enters the room, the room
    // will trigger a getLocation event emitted to the driver client.
    // The driver client will response their live location.

    // figure out a way to get driverId from redis,
    // using orderId, send the driver Id to broadcast to clients,
    // using driverAdded socket event

    // console.log(
    //   "namespace room size: ",
    //   global.io._nsps.get(namespace).adapter.rooms.get(room).size
    // );
    const roomSize = global.io._nsps
      .get(namespace)
      .adapter.rooms.get(room).size;
    // console.log(room + " roomSize: ", roomSize);
    // handle roomSize clause here

    if (roomSize > 1) {
      console.log(roomSize + " clients have joined room:" + room);
      let driverId;
      // driver socket added to room
      socket.on(SocketEvents.driverAdded, ({ data }) => {
        let { userId } = data;
        driverId = userId;
        // console.log("driver:" + driverId + " added to order:" + orderId);
        // navigate to vendor event emitted to driver client
        socket.emit("navigate", {
          type: "NAVIGATE_TO_VENDOR",
        });
        // emit driver added event to customer and vendor clients
        socket.broadcast.emit(SocketEvents.driverAdded, {
          data: { driverId: driverId, orderId: orderId },
        });
      });

      socket.on(SocketEvents.sendLocation, ({ data }) => {
        // console.log("socket " + socket.id + " shared data: ", data);
        socket.broadcast.emit(SocketEvents.sendLocation, {
          data: data,
        });
      });

      socket.on("navigate", ({ type, data }) => {
        // customer client and vendor client receiveing this socket events,
        // are not configued currently for socket namespace and discrete socket connection identifying

        // event is simply passing the orderId for clientside event handling for multiple orders

        // when driver arrives at vendor, send this socket event from client
        console.log("navigate event: type: ", type, " data: ", data);
        if (type === "ARRIVE_TO_VENDOR") {
          console.log("driver arrived to vendor");
          socket.broadcast.emit("message", {
            type: "ARRIVE_TO_VENDOR",
            data: data,
          });
        }
        if (type === "PICKUP_PRODUCT") {
          console.log("driver picked up the product");
          socket.emit("navigate", {
            type: "NAVIGATE_TO_CUSTOMER",
          });
          socket.broadcast.emit("message", {
            type: "PICKUP_PRODUCT",
            data: data,
          });
        }
        if (type === "ARRIVE_TO_CUSTOMER") {
          console.log("driver arrived to customer");
          // handle different message on the client side
          socket.broadcast.emit("message", {
            type: "ARRIVE_TO_CUSTOMER",
            data: data,
            // message: "${driver.firstName} has arrived with the delivery!",
          });
        }
        if (type === "DELIVER_PRODUCT") {
          console.log("driver delivered a product to customer");
          // this message may need to be configued to handle a list of orderId
          // handle completing multiple orders on the client side
          socket.broadcast.emit("message", {
            type: "DELIVER_PRODUCT",
            data: data,
          });
        }

        // this maybe is not valid anymore V
        // driver client:
        // check for more deliveries in the driver queue
        // note: create document watcher to watch driver distance from vendor,
        // and send event to driver to allow PICKUP_PRODUCT if they are in range.
        // send event to driver to allow ARRIVE_TO_CUSTOMER to allow delivery when in range
      });
    }
  }
});

function saveClient(userId, socketId) {
  connectClientController.saveConnectedClient(userId, socketId);
}

function getOrderIdFromRoom(room) {
  let orderId = room.split(":")[1];
  return orderId;
}

export default global.io;
