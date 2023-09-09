import { createClient } from 'redis';
import { type ClientType } from '../dispatch.types';
import { type RoomType } from '../worker/WorkerRoom';

const dispatchRoomsRedis = createClient({
	url: process.env.DISPATCH_ROOMS_REDIS_URL,
});
dispatchRoomsRedis.on('error', (err) => {
	console.error('dispatch rooms redis: ', err);
	throw new Error(err.message);
});
dispatchRoomsRedis.connect();

class DispatchRoomsController {
	async createRoom(room: RoomType) {
		room.clients.forEach(
			async (client) =>
				// make sure to await all clients being add to room before posting to Redis
				await dispatchRoomsRedis
					.SADD(room.id, JSON.stringify(client))
					.catch((error: any) => {
						console.error('createRoom: ', error);
					}),
		);
	}

	async getClientsByRoom(roomId: string) {
		return await dispatchRoomsRedis
			.sMembers(roomId)
			.catch((err) => console.info('getRoomById: ', err));
	}

	async isClientInRoom(roomId: string, client: ClientType) {
		return await dispatchRoomsRedis.sIsMember(roomId, JSON.stringify(client));
	}

	async addClient(roomId: string, client: ClientType) {
		return await dispatchRoomsRedis.SADD(roomId, JSON.stringify(client));
	}
}

const dispatchRoomController = new DispatchRoomsController();
export { dispatchRoomController };
