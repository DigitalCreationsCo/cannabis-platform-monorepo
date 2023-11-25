import { Client } from '../types/dispatch.types';

export function checkClientsForUser(clients: Client[], id: string) {
	return clients.some((client) => client.userId === id);
}

export function createRoomId(
	namespace: 'select-driver' | 'deliver-order',
	orderId: string,
) {
	return `${namespace}:${orderId}`;
}

export function getOrderIdFromRoom(roomname: string): string {
	return roomname.split(':')[1] || '';
}
