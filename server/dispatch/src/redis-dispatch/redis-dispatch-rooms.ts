import console from 'console';
import { isEmpty, type Client, type RoomType } from '@cd/core-lib';
import { createClient } from 'redis';
import type WorkerRoom from '../worker/WorkerRoom';

const redisDispatchRooms = createClient({
	socket: {
		host: process.env.REDIS_DISPATCH_ROOMS,
		port: Number(process.env.REDIS_DISPATCH_ROOMS_PORT),
	},
	password: process.env.REDIS_DISPATCH_ROOMS_PASSWORD,
});
redisDispatchRooms.on('connect', () => {
	console.info('redisDispatchRooms connected');
});
redisDispatchRooms.on('error', (err) => {
	throw new Error(err.message);
});
redisDispatchRooms.connect();

class RedisredisDispatchRoomsController {
	async getRooms() {
		return redisDispatchRooms.KEYS('*').then((keys) => {
			if (!keys.length) return [];
			return redisDispatchRooms
				.MGET(keys)
				.then((rooms) =>
					rooms
						.filter((r) => !isEmpty(r))
						.map((room) => room && JSON.parse(room)),
				);
		});
	}

	async getRoomById(roomId: string): Promise<WorkerRoom> {
		return await redisDispatchRooms
			.GET(roomId)
			.then((room) => room && JSON.parse(room))
			.catch((err) => console.info('getRoomById: ', err));
	}

	async createRoom(room: RoomType) {
		return await redisDispatchRooms
			.SET(room.id, JSON.stringify(room))
			.catch((err) => console.info('createRoom: ', err));
	}

	// async getClientsByRoom(roomId: string) {
	// 	return await dispatchRoomsRedis
	// 		.sMembers(roomId)
	// 		.catch((err) => console.info('getClientsByRoom: ', err));
	// }

	// async isClientInRoom(roomId: string, client: Client) {
	// 	return await dispatchRoomsRedis
	// 		.sIsMember(roomId, JSON.stringify(client))
	// 		.catch((err) => console.info('isClientInRoom: ', err));
	// }

	// async addClient(roomId: string, client: Client) {
	// 	return await dispatchRoomsRedis
	// 		.SADD(roomId, JSON.stringify(client))
	// 		.catch((err) => console.info('addClient: ', err));
	// }

	async removeClientFromRoom(roomId: string, client: Client) {
		return await redisDispatchRooms
			.SREM(roomId, JSON.stringify(client))
			.catch((err) => console.info('removeClientFromRoom: ', err));
	}

	async deleteRoom(roomId: string) {
		console.info('deleteRoom', { roomId });
		global.io.sockets.adapter.rooms.delete(roomId);
		await redisDispatchRooms
			.DEL(roomId)
			.catch((err) => console.info('deleteRoom: ', err));
	}

	async deleteClosedRooms() {
		const rooms = await this.getRooms();
		rooms.forEach(async (room: RoomType) => {
			if ((room && room.isClosed) || room.isClosed === undefined) {
				await this.deleteRoom(room.id);
			}
		});
		console.debug(
			'RedisredisDispatchRoomsController closed ' + rooms.length + ' rooms',
		);
	}
}

const redisDispatchRoomsController = new RedisredisDispatchRoomsController();
export { redisDispatchRoomsController };
