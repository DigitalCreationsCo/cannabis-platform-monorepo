import { createClient } from 'redis';
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
		// make sure to await all clients being add to room before posting to Redis
		await dispatchRoomsRedis
			.HSET(room.id, { id: room.id, clients: JSON.stringify(room.clients) })
			.catch((error: any) => {
				console.error('createRoom: ', error);
			});
	}
	async getRoomById(roomId: string) {
		return await dispatchRoomsRedis
			.hGetAll(roomId)
			.catch((err) => console.info('getRoomById: ', err));
	}
}

const dispatchRoomController = new DispatchRoomsController();
export { dispatchRoomController };
