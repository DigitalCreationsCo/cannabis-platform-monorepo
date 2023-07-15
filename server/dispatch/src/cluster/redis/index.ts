import { createClient } from "redis";

const
  redisPubClientUrl = process.env.DISPATCH_PUB_REDIS_URL;

const
  publishRedisClient = createClient({ url: redisPubClientUrl }).on("error", (err) => { console.info("Publisher Redis Client Error: ", err); throw new Error("Publisher Redis Client Error: " + err.message); })
// await
publishRedisClient.connect();

const
  subscribeRedisClient = publishRedisClient.duplicate().on("error", (err) => { console.info("Subscriber Redis Client Error: ", err); throw new Error("Subscriber Redis Client Error: " + err.message); })
// await
subscribeRedisClient.connect();


const
  redisConnectClientUrl = process.env.DISPATCH_CONNECT_REDIS_URL;

const
  connectRClient = createClient({ url: redisConnectClientUrl });
connectRClient.on("error", (err) => { console.info("Client Connnect Redis Client Error: ", err); throw new Error("Client Connnect Redis Client Error: " + err.message); })
// await
connectRClient.connect();


class ConnectClientController {

  async saveConnectedClient(userId: string, socketId: string) {
    await connectRClient
      .HSET(userId, { userId, socketId })
      .catch((err) => {
        console.info("RedisConnectClientController ERROR: ", err);
      });
  }

  async getSocketsByDriverIds(idList: { driverId: string }[]) {

    let
      sockets: string[] = [],
      id;

    for (id of idList) {

      id = id.driverId.toString();

      await connectRClient
        .HGETALL(id)
        .then((user) => {
          // console.info("user from redis: ", user);
          return user.socketId;
        })
        .then(sockets.push)
        .catch((err) => console.info('connectClient get user error: ', err));
    }

    return sockets;

  }
}

const connectClientController = new ConnectClientController();

export {
  publishRedisClient,
  subscribeRedisClient,
  connectClientController,
};

