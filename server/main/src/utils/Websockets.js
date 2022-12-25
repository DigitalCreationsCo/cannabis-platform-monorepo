import VendorsDAO from "../data-access/vendorsDAO";

class WebSockets {
  constructor() {
    this.users = [];
  }
  async connection(client) {
    // event fired when the socket is disconnected
    client.on("disconnect", () => {
      this.users = this.users.filter((user) => user.socketId !== client.id);
    });
    // add identity of user mapped to the socket id
    client.once("identity", (userId) => {
      this.users.push({
        socketId: client.id,
        userId: userId,
      });
      console.log(this.users);
    });

    // subscribe to room & other user as well (!)
    client.on("subscribe", (room, otherUserId = "") => {
      this.subscribeOtherUser(room, otherUserId);
      client.join(room);
    });
    client.on("subscribeToPendingOrders", async (userId) => {
      const changeStream = await VendorsDAO.watchPendingOrders(userId);
      changeStream.on("change", (change) => {
        switch (change.operationType) {
          case "insert":
            client.emit("changeInsert", change.fullDocument);
            break;
          case "delete":
            client.emit("changeDelete", change.documentKey._id);
          default:
            client.emit("changeEvent", change);
        }
      });
    });
    // leave the current socket room
    // client.on("unsubscribe", (room) => {
    //   client.leave(room);
    // });
  }
}

export default new WebSockets();
