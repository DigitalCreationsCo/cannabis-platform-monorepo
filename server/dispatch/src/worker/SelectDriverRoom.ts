import { TextContent } from '@cd/core-lib';
import { type OrderWithDispatchDetails } from '@cd/data-access';
import { type Client } from '../dispatch.types';
import Messager, { dispatchEvents } from '../message';
import WorkerRoom from './WorkerRoom';

class SelectDriverRoom extends WorkerRoom {
	messager: typeof Messager;
	isDriverSelected = false;

	constructor(room: string, clients: Client[]) {
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
				// send new order notification to all clients
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
						event: dispatchEvents.new_order,
						socketId: client.socketId,
						data:
							TextContent.dispatch.status.NEW_ORDER +
							'\n' +
							TextContent.dispatch.status.PICKUP_ADDRESS_f(order.organization),
					});
				});
			},
		);

		// on accept order event,
		this.on(dispatchEvents.accept_order, async (acceptingClients: Client[]) => {
			this.clients.forEach((client) => {
				// send declined order notification to the declined clients
				if (
					!acceptingClients.find((acceptingC) => acceptingC.id === client.id)
				) {
					this.messager.sendSMS({
						event: dispatchEvents.order_assigned_to_another_driver,
						phone: client.phone,
						data: TextContent.dispatch.status.ORDER_ASSIGNED_TO_ANOTHER_DRIVER,
					});
					this.messager.sendSocketMessage({
						event: dispatchEvents.order_assigned_to_another_driver,
						socketId: client.socketId,
						data: TextContent.dispatch.status.ORDER_ASSIGNED_TO_ANOTHER_DRIVER,
					});
				}

				// send accept order notification to the accepted client
				if (
					acceptingClients.find((acceptingC) => acceptingC.id === client.id)
				) {
					this.emit('add-driver-to-record');
					console.info(
						`${this.id}: client ${client.id} accepted order ${client.orderId}`,
					);
					this.messager.sendSMS({
						event: dispatchEvents.order_assigned,
						phone: client.phone,
						data: TextContent.dispatch.status.ACCEPT_ORDER,
					});
					this.messager.sendSocketMessage({
						event: dispatchEvents.order_assigned,
						socketId: client.socketId,
						data: TextContent.dispatch.status.ACCEPT_ORDER,
					});
					this.isDriverSelected = true;
				}
			});
		});
	}
}

export default SelectDriverRoom;
