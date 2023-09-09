import { createAdapter } from '@socket.io/redis-adapter';
import { Server } from 'socket.io';
import {
	subscribeWebsocketConnectClientRedis,
	websocketConnectClientRedis,
} from '../redis-client';
import WorkerRoomController from './worker.controller';

const io = new Server();
io.adapter(
	createAdapter(
		websocketConnectClientRedis,
		subscribeWebsocketConnectClientRedis,
	),
);

new WorkerRoomController();

export default global.io = io;
