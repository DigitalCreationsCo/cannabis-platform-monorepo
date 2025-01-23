import { type Client } from '../types/dispatch.types';

function checkClientsForUser(clients: Client[], id: string) {
	return clients.some((client) => client.userId === id);
}

function createRoomId(
	namespace: 'select-driver' | 'deliver-order',
	orderId: string
) {
	return `${namespace}:${orderId}`;
}

function getOrderIdFromRoom(roomname: string): string {
	return roomname.split(':')[1] || '';
}

export {
	checkClientsForUser,
	createRoomId,
	getOrderIdFromRoom
}