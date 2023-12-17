import {
	dispatchEvents,
	SMSTemplate,
	SocketMessageTemplate,
	TextContent,
} from '@cd/core-lib';
import { type OrderWithDispatchDetails } from '@cd/data-access';
import { type Client } from '../../../../packages/core-lib/src/types/dispatch.types';
import Messager from '../message';
import WorkerRoom from './WorkerRoom';

class SelectDriverRoom extends WorkerRoom {
	messager: typeof Messager;
	isDriverSelected = false;

	constructor(room: string, clients: Client[]) {
		super(room, clients);
		this.messager = Messager;

		// send new order notification to all clients
		this.on(
			dispatchEvents.new_order,
			(order: OrderWithDispatchDetails['order']) => {
				clients.forEach((client) => {
					this.messager.sendSMS({
						event: dispatchEvents.new_order,
						phone: client.phone,
						data: SMSTemplate.driver.new_order_f(order),
					});
					this.messager.sendSocketMessage({
						event: dispatchEvents.new_order,
						socketId: client.socketId,
						data: SocketMessageTemplate.driver.new_order_f(order),
					});
				});
			},
		);

		// decline order event
		this.on(dispatchEvents.decline_order, (client: Client) => {
			this.clientLeaveRoom(client);
			this.emit(dispatchEvents.decline_order, client);
		});

		// on accept order event,
		this.once(
			dispatchEvents.accept_order,
			async (acceptingClients: Client[]) => {
				console.info('WORKER: Select-Driver-Room accept order event');
				this.clients.forEach((client) => {
					// send declined order notification to the declined clients
					if (
						!acceptingClients.find(
							(acceptingC) => acceptingC.userId === client.userId,
						)
					) {
						this.messager.sendSMS({
							event: dispatchEvents.order_assigned_to_another_driver,
							phone: client.phone,
							data: TextContent.dispatch.status
								.ORDER_ASSIGNED_TO_ANOTHER_DRIVER,
						});
						this.messager.sendSocketMessage({
							event: dispatchEvents.order_assigned_to_another_driver,
							socketId: client.socketId,
							data: TextContent.dispatch.status
								.ORDER_ASSIGNED_TO_ANOTHER_DRIVER,
						});
					}

					// send accept order notification to the accepted client
					if (
						acceptingClients.find(
							(acceptingC) => acceptingC.userId === client.userId,
						)
					) {
						console.info(
							`${this.id}: client ${client.userId} accepted order ${client.orderId}`,
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
						this.emit(dispatchEvents.add_driver_to_record, client);
					}
				});
			},
		);

		this.once(dispatchEvents.close_room, () => {
			this.close();
		});
	}
}

export default SelectDriverRoom;
