import { Client } from '../dispatch.types';

class RoomController {
	static SubscribeToRoom(orderId: string, socketId: string) {
		//   // iterate over all global rooms in master,
		let roomId;
		for (roomId in global.rooms) {
			// if room exists for orderId, (must be added in delivery namespace)
			if (global.io.sockets.adapter.rooms[roomId] === orderId) {
				return this.JoinRoom(
					_socketId,
					global.rooms[roomId].workerId,
					roomId,
					(_client) => {
						global.rooms[roomId].clients[_socketId] = _client;
					},
				);
			}
		}
	}

	static JoinRoom(
		_socketId,
		_workerId,
		_roomId,
		// _namespace,
		user,
		_callback,
	) {
		const client = new Client(
			_socketId,
			_workerId,
			_roomId,
			user.id,
			user.phone,
		);
		global.io.sockets.sockets.get(_socketId).adapter.remoteJoin(
			_socketId,
			_roomId,
			// _namespace,
			function (err: any) {
				if (err) {
					console.info('Error MASTER: remote join client ' + _socketId);
				} else {
					console.info('MASTER: client ' + _socketId + ' join in ' + _roomId);
					_callback(client);
				}
			},
		);
		return client;
	}
}

export default RoomController;
