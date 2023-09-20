import { createAdapter } from '@socket.io/redis-adapter';
import { Server } from 'socket.io';
import {
	subscribeWebsocketConnectClientRedis,
	websocketConnectClientRedis,
} from '../redis-client';
import WorkerRoomController from './worker.controller';

global.io = new Server();
global.io.adapter(
	createAdapter(
		websocketConnectClientRedis,
		subscribeWebsocketConnectClientRedis,
	),
);

new WorkerRoomController();
