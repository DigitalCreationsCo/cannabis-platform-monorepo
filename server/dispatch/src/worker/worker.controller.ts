/* eslint-disable no-case-declarations */
import DispatchDA from '../data-access/DispatchDA';
import {
	type ClusterMessage,
	type ClusterMessagePayload,
	type RoomAction,
} from '../dispatch.types';
import Messager from '../message/Messager';
import { dispatchRoomController } from '../redis-client';
import SelectDriverRoom from './SelectDriverRoom';

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
				payload: { roomId, client, message },
			}: ClusterMessage) => {
				switch (action) {
					case 'join-room':
						try {
							if (roomId.startsWith('select-driver')) {
								// i think a better idea is to create this class instance on the master with all the clients passed in, and then send the instance to the worker
								const room = new SelectDriverRoom(roomId, client);
								this.sendToMaster('connected-on-worker', { roomId, client });
								console.info(
									`WORKER ${process.pid}: client ${client.id} join room ${roomId}`,
								);
								break;
							} else if (roomId.startsWith('deliver-order')) {
								//
							}
						} catch (e) {
							console.error(
								'WORKER ' +
									process.pid +
									' error: client cannot join room. Socket id: ' +
									client.socketId +
									' (' +
									e +
									')',
							);
						}
						break;

					case 'leave-room': // if client disconnected from master process
						try {
							// handle the event in the room
							this.sendToMaster('leave-room', { roomId, client });
						} catch (e) {
							console.error(
								'WORKER ' +
									process.pid +
									' error: cannot delete user ' +
									client.id +
									' (' +
									e +
									')',
							);
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
