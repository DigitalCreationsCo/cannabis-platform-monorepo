/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable no-case-declarations */
import {
	dispatchEvents,
	getOrderIdFromRoom,
	NavigateEvent,
	type Client,
	type ClusterMessage,
	type ClusterMessagePayload,
	type RoomAction,
	type WorkerToMasterPayload,
} from '@cd/core-lib';
import { redisDispatchRoomsController } from '../redis-dispatch';
import DeliverOrderRoom from './DeliverOrderRoom';
import SelectDriverRoom from './SelectDriverRoom';
import type WorkerRoom from './WorkerRoom';

export default class WorkerRoomController {
	constructor() {
		process.on(
			'message',
			async ({
				action,
				payload: { roomId, clients, order },
			}: ClusterMessage<ClusterMessagePayload>) => {
				switch (action) {
					case 'join-room':
						try {
							if (roomId.startsWith('select-driver')) {
								// i think a better idea is to create this class instance on the master with all the clients passed in, and then send the instance to the worker
								// currently sending the clients to the worker, and then creating the instance on the worker
								// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
								const room = new SelectDriverRoom(roomId, clients as Client[]);
								await redisDispatchRoomsController.createRoom(room);
								this.sendToMaster('connected-on-worker', {
									message: `${clients?.length} clients joined ${roomId}.`,
									roomId,
									orderId: getOrderIdFromRoom(roomId),
								});
								room.emit(dispatchEvents.new_order, order);
								break;
							} else if (roomId.startsWith('deliver-order')) {
								console.log('deliver-order room created, ' + roomId);
								this.sendToMaster('connected-on-worker', {
									message: `${clients?.length} clients joining ${roomId}: Dispatching order to drivers`,
									roomId,
									orderId: getOrderIdFromRoom(roomId),
								});
								// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
								const room = new DeliverOrderRoom(roomId, clients as Client[]);
								await redisDispatchRoomsController.createRoom(room);

								room.once(
									NavigateEvent.pickup_product,
									async (roomId: string) => {
										try {
											console.info('room emitted pickup-product event');
											const send = this.sendToMaster('pickup-product', {
												roomId,
												orderId: getOrderIdFromRoom(roomId),
											});
											if (!send)
												throw new Error('sendToMaster: pickup-product failed');
										} catch (error) {
											console.error('pickup-product event: ', error);
										}
									},
								);

								room.once(
									NavigateEvent.deliver_product,
									async (roomId: string) => {
										try {
											console.info('room emitted deliver-product event');
											const send = this.sendToMaster('deliver-product', {
												roomId,
												orderId: getOrderIdFromRoom(roomId),
											});
											if (!send)
												throw new Error('sendToMaster: deliver-product failed');
										} catch (error) {
											console.error('deliver-product event: ', error);
										}
									},
								);

								room.once(
									dispatchEvents.customer_received_order,
									async (roomId: string) => {
										console.info('room emitted customer-receive-product event');
										const send = this.sendToMaster('customer-receive-product', {
											roomId,
											orderId: getOrderIdFromRoom(roomId),
										});
										if (!send)
											throw new Error(
												'sendToMaster: customer-receive-product failed',
											);
									},
								);

								room.emit(dispatchEvents.driver_added, order);
								break;
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

						// const room = await redisDispatchRoomsController.getRoomById(roomId);
						// room.emit('message', message);
						// Messager.sendMessage(client, message as string);
						// console.log(
						// 	'WORKER ' +
						// 		process.pid +
						// 		': user ' +
						// 		client.userId +
						// 		' in room send msg ' +
						// 		message,
						// );
						break;

					case 'accept-order':
						try {
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
								await redisDispatchRoomsController.getRoomById(roomId);
							console.log('room: ', room);

							let newRoom: SelectDriverRoom | undefined;
							newRoom = new SelectDriverRoom(roomId, clients as Client[]);

							newRoom.once(
								dispatchEvents.add_driver_to_record,
								async (client: Client) => {
									console.info('client ', client);
									console.info('room emitted add-driver-to-record event');
									const send = this.sendToMaster('add-driver-to-record', {
										roomId,
										client,
										orderId: getOrderIdFromRoom(roomId),
									});
									console.info('sendToMaster: ', send);
									if (!send)
										throw new Error(
											'sendToMaster: add-driver-to-record failed',
										);
									newRoom?.emit(dispatchEvents.close_room);
								},
							);

							newRoom.addListener('closed', async () => {
								if (newRoom) newRoom = undefined;
								console.info(`room ${roomId} closed`);
							});

							newRoom.emit(dispatchEvents.accept_order, clients);
							console.info('emit accept-order to room: ', newRoom.id);
						} catch (error) {
							console.error('accept-order: ', error);
							throw new Error(error.message);
						}
						break;

					case 'order-complete':
						try {
							console.info(
								'order-complete command received on worker room: ',
								roomId,
							);
							console.info('room id: ', roomId);
							console.info('clients: ', clients);
							console.info('order: ', order);

							const room: WorkerRoom | undefined =
								await redisDispatchRoomsController.getRoomById(roomId);
							console.log('room: ', room);

							let newRoom;
							newRoom = new DeliverOrderRoom(roomId, clients as Client[]);

							newRoom.addListener('closed', async () => {
								newRoom = undefined;
								console.info(`room ${roomId} closed`);
							});

							newRoom.emit(dispatchEvents.order_complete);
						} catch (error) {
							console.error('pickup-product event: ', error);
						}
						break;
				}
			},
		);
	}

	sendToMaster(action: RoomAction, payload: WorkerToMasterPayload) {
		return process?.send?.({ action, payload });
	}
}
