import { Server } from 'socket.io';
import { WorkerRoom } from 'types';

declare global {
	var io: Server;
	var rooms: Record<string, WorkerRoom>;
	var lastWorkerId: number;
}
