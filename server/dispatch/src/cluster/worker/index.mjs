// isWorker
import { createAdapter } from '@socket.io/redis-adapter';
import { Server } from 'socket.io';
import { publishRedisClient, subscribeRedisClient } from '../redis';

global.io = new Server();
global.io.adapter(createAdapter(publishRedisClient, subscribeRedisClient));

// const WorkerClusterListeners = require("./modules/cluster/worker/worker-listeners");
// new WorkerClusterListeners();

export default global.io;
// export { };
