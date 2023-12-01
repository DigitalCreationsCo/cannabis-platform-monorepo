/* eslint-disable no-var */
import { type Server } from 'socket.io';
import { type Logger } from 'winston';

declare global {
	var logger: Logger;

	var io: Server;
	var rooms: Record<string, WorkerRoom>;
	var lastWorkerId: number;
}
