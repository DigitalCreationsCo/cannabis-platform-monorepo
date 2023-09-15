import { TextContent } from '@cd/core-lib';
import { type OrderWithDispatchDetails } from '@cd/data-access';
import { type ClientType } from '../dispatch.types';
import Messager, { dispatchEvents } from '../message';
import WorkerRoom from './WorkerRoom';

class SelectDriverRoom extends WorkerRoom {
	messager: typeof Messager;
	constructor(room: string, clients: ClientType[]) {
		super(room, clients);
		this.messager = Messager;
		clients.forEach((client) =>
			global.io
				.fetchSockets()
				.then((sockets) =>
					sockets.find((socket) => socket.id === client.socketId)?.join(room),
				),
		);
		console.info(
			`WORKER ${process.pid}: ${clients.length} clients join room ${room}`,
		);
		this.on(
			dispatchEvents.new_order,
			(order: OrderWithDispatchDetails['order']) => {
				clients.forEach((client) => {
					this.messager.sendSMS({
						event: dispatchEvents.new_order,
						phone: client.phone,
						data:
							TextContent.dispatch.status.NEW_ORDER_FROM_GRAS +
							'\n' +
							TextContent.dispatch.status.PICKUP_ADDRESS_f(order.organization) +
							'\n' +
							TextContent.dispatch.status.REPLY_TO_ACCEPT_ORDER,
					});
					this.messager.sendSocketMessage({
						socketId: client.socketId,
						data:
							TextContent.dispatch.status.NEW_ORDER +
							'\n' +
							TextContent.dispatch.status.PICKUP_ADDRESS_f(order.organization),
					});
				});
			},
		);
	}
}

export default SelectDriverRoom;
