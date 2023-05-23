const { createClient } = require("redis");

const publishRedisClient = createClient({ host: "127.0.0.1", port: 6379 });
publishRedisClient.on("error", (err) =>
  console.log("Publisher Redis Client Error: ", err)
);
publishRedisClient.connect();

// SUB CLIENT
const subscribeRedisClient = publishRedisClient.duplicate();
subscribeRedisClient.on("error", (err) =>
  console.log("Subscriber Redis Client Error: ", err)
);
subscribeRedisClient.connect();

const connectRClient = createClient({ host: "127.0.0.1", port: 6380 });
connectRClient.on("error", (err) =>
  console.log("Client Connnect Redis Client Error: ", err)
);
connectRClient.connect();

class ConnectClientController {
  saveConnectedClient(userId, socketId) {
    connectRClient
      .HSET(userId, { userId, socketId })
      .catch((err) => console.log("RedisConnectClientController ERROR: ", err));
  }

  async getSocketFromDriverIds(idList) {
    const sockets = [];
    let id;
    for (id of idList) {
      id = id.driverId.toString();
      await connectRClient
        .HGETALL(id)
        .then((user) => {
          // console.log("user from redis: ", user);
          return user.socketId;
        })
        .then((socketId) => sockets.push(socketId))
        .catch((err) => console.log(err));
    }
    // console.log("sockets: ", sockets);
    return sockets;
  }
}

const connectClientController = new ConnectClientController();

export {
    publishRedisClient,
    subscribeRedisClient,
    connectClientController,
};

