/* eslint-disable no-case-declarations */
import DispatchDA from '../data-access/DispatchDA';
import {
	type Client,
	type ClusterMessage,
	type ClusterMessagePayload,
	type RoomAction,
} from '../dispatch.types';
import Messager, { dispatchEvents } from '../message';
import { dispatchRoomController } from '../redis-client';
import SelectDriverRoom from './SelectDriverRoom';
import type WorkerRoom from './WorkerRoom';

export default class WorkerRoomController {
	db: typeof DispatchDA = {} as typeof DispatchDA;
	messager: Messager;

	constructor() {
		this.db = DispatchDA;
		this.messager = new Messager();

		import('../data-access/DispatchDA').then(async (DispatchDA) => {
			this.db = await DispatchDA.default;
		});

		process.on(
			'message',
			async ({
				action,
				payload: { roomId, clients, order },
			}: ClusterMessage) => {
				switch (action) {
					case 'join-room':
						try {
							if (roomId.startsWith('select-driver')) {
								// i think a better idea is to create this class instance on the master with all the clients passed in, and then send the instance to the worker
								// currently doing this now
								this.sendToMaster('connected-on-worker', {
									message: `${clients?.length} clients joining ${roomId}: Dispatching order to drivers`,
									roomId,
								});
								// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
								const room = new SelectDriverRoom(roomId, clients as Client[]);
								await dispatchRoomController.createRoom(room);
								room.emit(dispatchEvents.new_order, order);
								break;
							} else if (roomId.startsWith('deliver-order')) {
								console.log('deliver-order room created, ' + roomId);
								//
							}
						} catch (error) {
							console.error(`WORKER ${process.pid} join-room: ${error}`);
						}
						break;

					case 'leave-room': // if client disconnected from master process
						// try {
						// 	// handle the event in the room
						// 	this.sendToMaster('leave-room', { roomId, client });
						// } catch (error) {
						// 	console.error(`WORKER ${process.pid} leave-room: ${error}`);
						// }
						break;

					case 'send-message':
						// triggered 'sendMsg' event on master process
						// global.io
						// 	.to(client.roomId)
						// 	.emit(
						// 		'chat message',
						// 		'room: ' +
						// 			client.roomId +
						// 			', id: ' +
						// 			client.socketId +
						// 			'; ' +
						// 			cameMsg,
						// 	);

						// const room = await dispatchRoomController.getRoomById(roomId);
						// room.emit('message', message);
						// Messager.sendMessage(client, message as string);
						// console.log(
						// 	'WORKER ' +
						// 		process.pid +
						// 		': user ' +
						// 		client.id +
						// 		' in room send msg ' +
						// 		message,
						// );
						break;

					case 'accept-order':
						console.info(
							'accept-order command received on worker room: ',
							roomId,
						);
						console.info('room id: ', roomId);
						console.info('clients: ', clients);
						console.info('order: ', order);

						// console.info('global rooms: ');
						// console.info(global.rooms);
						const room: WorkerRoom | undefined =
							await dispatchRoomController.getRoomById(roomId);
						console.log('room: ', room);
						let newRoom;
						newRoom = new SelectDriverRoom(roomId, clients as Client[]);
						newRoom.emit(dispatchEvents.accept_order, clients);
						console.info('emit accept-order to room: ', room.id);
						newRoom.on('add-driver-to-record', () => {
							console.info('room emitted add-driver-to-record event');
							// console.info('add-driver-to-record event received');
							// this.sendToMaster('add-driver-to-record', { roomId, client });
							// update order record in prisma and mongodb
							// await DispatchDA.addDriverToOrderRecord(
							// 	getOrderIdFromRoom(this.id),
							// 	client.id,
							// );
						});
						newRoom.on('close', () => {
							newRoom = undefined;
						});
						break;
				}
			},
		);
	}

	sendToMaster(action: RoomAction, payload: ClusterMessagePayload) {
		process?.send?.({ action, payload });
	}
}
