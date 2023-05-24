import { createAdapter } from '@socket.io/redis-adapter';
import { Server } from 'socket.io';
import { publishRedisClient, subscribeRedisClient } from '../redis';

// const { publishRedisClient, subscribeRedisClient } = require('../redis/index.ts');
// const Server = require("socket.io");
// const { createAdapter } = require("@socket.io/redis-adapter");

const 
io = new Server();
io.adapter(createAdapter(publishRedisClient, subscribeRedisClient));

// const WorkerClusterListeners = require("./modules/cluster/worker/worker-listeners");
// new WorkerClusterListeners();

// export default global.io = io;
export default io;