/* eslint-disable no-var */
import { type Server } from 'socket.io';
import { type WorkerRoom } from './src/dispatch.types';

declare global {
	var io: Server;
	var rooms: Record<string, WorkerRoom>;
	var lastWorkerId: number;
}
