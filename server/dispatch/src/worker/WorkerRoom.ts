import { EventEmitter } from 'events';
import { dispatchEvents, type NavigateEvent, type Client } from '@cd/core-lib';
import { type Socket } from 'socket.io';
import {
	redisDispatchClientsController,
	redisDispatchRoomsController,
} from '../redis-dispatch';

export default class WorkerRoom extends EventEmitter {
	id;
	clients: Client[];
	isClosed = false;
	constructor(id: string, clients: Client[]) {
		super();
		this.id = id;
		this.clients = [...clients];
		clients.forEach((client) =>
			global.io.sockets.fetchSockets().then((sockets) => {
				const socket = sockets.find((socket) => socket.id === client.socketId);
				socket?.join(this.id);

				// TEST SOCKET EVENT HANDLING
				global.io.of('/').adapter.on('join-room', async (room: string) => {
					console.info('WORKER: global io.of("/") room: ', room);
					if (room === this.id) {
						console.info('this room');
					}
				});

				// TEST SOCKET EVENT HANDLING
				global.io.sockets.adapter.on(
					'join-room',
					async (adapterSocket: Socket) => {
						// share coordinates with other clients in the room

						console.info('adapter socket: ', adapterSocket);
						adapterSocket.on(
							dispatchEvents.send_location,
							(coordinates: [number, number]) => {
								this.emit(dispatchEvents.send_location, coordinates);
							},
						);

						adapterSocket.on(
							dispatchEvents.navigate,
							({
								type,
							}: {
								type: typeof NavigateEvent[keyof typeof NavigateEvent];
							}) => {
								this.emit(dispatchEvents.navigate, type);
							},
						);

						adapterSocket.on(dispatchEvents.customer_received_order, () => {
							this.emit(dispatchEvents.customer_received_order);
						});
					},
				);
			}),
		);
		console.info(
			`WORKER ${process.pid}: ${clients.length} clients join room ${this.id}`,
		);
	}

	async clientLeaveRoom(client: Client) {
		console.info(
			`WORKER ${process.pid}: client ${client.phone} leave room ${this.id}`,
		);
		global.io
			.fetchSockets()
			.then((sockets) =>
				sockets.find((socket) => socket.id === client.socketId)?.leave(this.id),
			);
		await redisDispatchClientsController.removeRoomFromClient(client);
		await redisDispatchRoomsController.removeClientFromRoom(this.id, client);
		this.clients = this.clients.filter((c) => c.userId !== client.userId);
	}

	async close() {
		console.info(`closing room ${this.id}`);
		this.clients.forEach((client) =>
			global.io
				.fetchSockets()
				.then((sockets) =>
					sockets
						.find((socket) => socket.id === client.socketId)
						?.leave(this.id),
				),
		);
		this.removeAllListeners();
		this.clients.forEach(async (client) => {
			await redisDispatchClientsController.removeRoomFromClient(client);
		});
		await redisDispatchRoomsController.deleteRoom(this.id);
		this.emit(dispatchEvents.closed);
		this.isClosed = true;
	}
}
