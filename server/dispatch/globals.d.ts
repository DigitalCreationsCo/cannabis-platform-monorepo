/* eslint-disable no-var */
import { type Server } from 'socket.io';

declare global {
	var io: Server;
	// var rooms: Record<string, WorkerRoom>;
	var lastWorkerId: number;
}
