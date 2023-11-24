import { createAdapter } from '@socket.io/redis-adapter';
import { Server } from 'socket.io';
import {
	redisDispatchSockets,
	subscribeDispatchSockets,
} from '../redis-dispatch';
import WorkerRoomController from './worker.controller';

global.io = new Server();
global.io.adapter(
	createAdapter(redisDispatchSockets, subscribeDispatchSockets),
);

new WorkerRoomController();
