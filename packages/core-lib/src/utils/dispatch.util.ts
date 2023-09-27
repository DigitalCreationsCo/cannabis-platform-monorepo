import { type ClientType } from '../types/dispatch.types';

export function checkClientsForUser(clients: ClientType[], id: string) {
	return clients.some((client) => client.id === id);
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
