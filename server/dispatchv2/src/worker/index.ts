console.info('worker node is running...');

import { createAdapter } from '@socket.io/redis-adapter';
import { Server } from 'socket.io';
import {
	subscribeWebsocketConnectClientRedis,
	websocketConnectClientRedis,
} from '../redis-client';

console.log('worker init');
const io = new Server();
io.adapter(
	createAdapter(
		websocketConnectClientRedis,
		subscribeWebsocketConnectClientRedis,
	),
);

// const WorkerClusterListeners = require("./modules/cluster/worker/worker-listeners");
// new WorkerClusterListeners();

// export default global.io = io;
export default io;
