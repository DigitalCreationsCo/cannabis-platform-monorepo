import DispatchDA from '../data-access/DispatchDA';
import {
	type ClusterMessage,
	type ClusterMessagePayload,
	type RoomAction,
} from '../dispatch.types';
import Messager from '../message/Messager';

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
							global.io
								.fetchSockets()
								.then((sockets) =>
									sockets
										.find((socket) => socket.id === client.socketId)
										?.join(roomId),
								);
							this.sendToMaster('connected-on-worker', { roomId, client });
							console.info(
								`WORKER ${process.pid}: client ${client.id} join room ${roomId}`,
							);
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
							await global.io.sockets.sockets
								.get(client.socketId)
								?.leave(roomId);
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

					case 'send-message': // triggered 'sendMsg' event on master process
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
