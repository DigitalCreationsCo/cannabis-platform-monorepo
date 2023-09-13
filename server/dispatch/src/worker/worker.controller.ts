/* eslint-disable no-case-declarations */
import { dispatchEvents } from 'message/message-events';
import DispatchDA from '../data-access/DispatchDA';
import {
	type ClusterMessage,
	type ClusterMessagePayload,
	type RoomAction,
} from '../dispatch.types';
import Messager from '../message/Messager';
import { dispatchRoomController } from '../redis-client';
import SelectDriverRoom from './SelectDriverRoom';

global.rooms = dispatchRoomController.getRooms();
export default class WorkerRoomController {
	db: typeof DispatchDA = {} as typeof DispatchDA;
	messager: Messager;

	constructor() {
		this.db = DispatchDA;
		this.messager = new Messager();

		process.on(
			'message',
			async ({
				action,
				payload: { roomId, clients, message },
			}: ClusterMessage) => {
				switch (action) {
					case 'join-room':
						try {
							if (roomId.startsWith('select-driver')) {
								// i think a better idea is to create this class instance on the master with all the clients passed in, and then send the instance to the worker
								// currently doing this now
								this.sendToMaster('connected-on-worker', {
									message: `${roomId}: Dispatching order to drivers`,
									roomId,
								});
								// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
								const room = new SelectDriverRoom(roomId, clients!);
								await dispatchRoomController.createRoom(room);
								room.emit(dispatchEvents.new_order);
								break;
							} else if (roomId.startsWith('deliver-order')) {
								//
							}
						} catch (error) {
							console.error(`WORKER ${process.pid} join-room: ${error}`);
						}
						break;

					case 'leave-room': // if client disconnected from master process
						try {
							// handle the event in the room
							this.sendToMaster('leave-room', { roomId, client });
						} catch (error) {
							console.error(`WORKER ${process.pid} leave-room: ${error}`);
						}
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
						const room = await dispatchRoomController.getRoomById(roomId);
						room.emit('message', message);
						Messager.sendMessage(client, message as string);
						console.log(
							'WORKER ' +
								process.pid +
								': user ' +
								client.id +
								' in room send msg ' +
								message,
						);
						break;
				}
			},
		);
	}

	sendToMaster(action: RoomAction, payload: ClusterMessagePayload) {
		process?.send?.({ action, payload });
	}

	deleteRoom(roomId: string) {
		global.io.sockets.adapter.rooms.delete(roomId);
	}
}
