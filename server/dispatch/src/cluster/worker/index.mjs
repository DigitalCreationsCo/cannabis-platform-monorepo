// isWorker
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';
import { Server } from 'socket.io';

global.io = new Server();

const publishRedisClient = createClient({ host: "127.0.0.1", port: 6379 });
publishRedisClient.on("error", (err) =>
  console.log("Publisher Redis Client Error: ", err)
);
publishRedisClient.connect();

const subscribeRedisClient = publishRedisClient.duplicate();
subscribeRedisClient.on("error", (err) =>
  console.log("Subscriber Redis Client Error: ", err)
);
subscribeRedisClient.connect();

global.io.adapter(createAdapter(publishRedisClient, subscribeRedisClient));

// const WorkerClusterListeners = require("./modules/cluster/worker/worker-listeners");
// new WorkerClusterListeners();

// export default global.io;

export { };
