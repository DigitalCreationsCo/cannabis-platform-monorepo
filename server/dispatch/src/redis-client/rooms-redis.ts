import { isEmpty } from '@cd/core-lib';
import { createClient } from 'redis';
import {
	type Client,
	type RoomType,
} from '../../../../packages/core-lib/src/types/dispatch.types';
import type WorkerRoom from '../worker/WorkerRoom';

const dispatchRoomsRedis = createClient({
	url: process.env.DISPATCH_ROOMS_REDIS_URL,
	socket: {
		tls: false,
		timeout: 20000,
	},
});
dispatchRoomsRedis.on('connect', () => {
	console.info('dispatch rooms redis: connected');
});
dispatchRoomsRedis.on('error', (err) => {
	console.error('dispatch rooms redis: ', err);
	throw new Error(err.message);
});
dispatchRoomsRedis.connect();

class DispatchRoomsController {
	getRooms() {
		async function getRoomsAsync() {
			return dispatchRoomsRedis.KEYS('*').then((keys) => {
				console.info('getRooms: keys: ', keys);
				if (!keys.length) return [];
				return dispatchRoomsRedis
					.MGET(keys)
					.then((rooms) =>
						rooms
							.filter((r) => !isEmpty(r))
							.map((room) => room && JSON.parse(room)),
					);
			});
		}
		return getRoomsAsync();
	}

	async getRoomById(roomId: string): Promise<WorkerRoom> {
		return await dispatchRoomsRedis
			.GET(roomId)
			.then((room) => room && JSON.parse(room))
			.catch((err) => console.info('getRoomById: ', err));
	}

	async createRoom(room: RoomType) {
		console.info('createRoom: ');
		console.info(room);
		return await dispatchRoomsRedis
			.SET(room.id, JSON.stringify(room))
			.catch((err) => console.info('createRoom: ', err));
	}

	// async getClientsByRoom(roomId: string) {
	// 	return await dispatchRoomsRedis
	// 		.sMembers(roomId)
	// 		.catch((err) => console.info('getClientsByRoom: ', err));
	// }

	// async isClientInRoom(roomId: string, client: ClientType) {
	// 	return await dispatchRoomsRedis
	// 		.sIsMember(roomId, JSON.stringify(client))
	// 		.catch((err) => console.info('isClientInRoom: ', err));
	// }

	// async addClient(roomId: string, client: ClientType) {
	// 	return await dispatchRoomsRedis
	// 		.SADD(roomId, JSON.stringify(client))
	// 		.catch((err) => console.info('addClient: ', err));
	// }

	async removeClientFromRoom(roomId: string, client: Client) {
		return await dispatchRoomsRedis
			.SREM(roomId, JSON.stringify(client))
			.catch((err) => console.info('removeClientFromRoom: ', err));
	}

	async deleteRoom(roomId: string) {
		// delete room from io object
		global.io.sockets.adapter.rooms.delete(roomId);
		// delete room from redis server
		await dispatchRoomsRedis
			.DEL(roomId)
			.catch((err) => console.info('deleteRoom: ', err));
	}

	async deleteClosedRooms() {
		console.info('scanning for closed rooms');
		const rooms = await this.getRooms();
		console.info('rooms: ', rooms);
		rooms.forEach(async (room: RoomType) => {
			if ((room && room.isClosed) || room.isClosed === undefined) {
				await this.deleteRoom(room.id);
			}
		});
	}
}

const dispatchRoomController = new DispatchRoomsController();
export { dispatchRoomController };
