import { createClient } from "redis";

const 
redisPubClientUrl = process.env.DISPATCH_PUB_REDIS_URL;

const
publishRedisClient = createClient({ url: redisPubClientUrl }).on("error", (err) => console.log("Publisher Redis Client Error: ", err))
// await
publishRedisClient.connect();

const 
subscribeRedisClient = publishRedisClient.duplicate().on("error", (err) => console.log("Subscriber Redis Client Error: ", err))
// await
subscribeRedisClient.connect();


const
redisConnectClientUrl = process.env.DISPATCH_CONNECT_REDIS_URL;

const
connectRClient = createClient({ url: redisConnectClientUrl });
connectRClient.on("error", (err) => console.log("Client Connnect Redis Client Error: ", err))
// await
connectRClient.connect();


class ConnectClientController {

  async saveConnectedClient (userId: string, socketId: string) {
    await connectRClient
      .HSET(userId, { userId, socketId })
      .catch((err) => console.log("RedisConnectClientController ERROR: ", err));
  }

  async getSocketsByDriverIds(idList: {driverId: string}[]) {
    
    let 
    sockets: string[] = [],
    id;

    for (id of idList) {

      id = id.driverId.toString();
      
      await connectRClient
        .HGETALL(id)
        .then((user) => {
          // console.log("user from redis: ", user);
          return user.socketId;
        })
        .then(sockets.push)
        .catch((err) => console.log(err));
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

