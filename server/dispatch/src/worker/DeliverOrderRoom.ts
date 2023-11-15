import {
	dispatchEvents,
	NavigateEvent,
	SMSTemplate,
	TextContent,
} from '@cd/core-lib';
import { type OrderWithDispatchDetails } from '@cd/data-access';
import { type Client } from '../../../../packages/core-lib/src/types/dispatch.types';
import Messager from '../message';
import WorkerRoom from './WorkerRoom';

class DeliverOrderRoom extends WorkerRoom {
	messager: typeof Messager;
	isDriverSelected = false;
	customer: Client;
	driver: Client;
	order: OrderWithDispatchDetails['order'] | null;

	constructor(room: string, clients: Client[]) {
		super(room, clients);
		this.customer = clients[0];
		this.driver = clients[1];
		this.messager = Messager;
		this.order = null;

		// notify customer that driver is on the way
		this.on(
			dispatchEvents.driver_added,
			(order: OrderWithDispatchDetails['order']) => {
				this.order = order;
				this.messager.sendMessage(
					dispatchEvents.driver_added,
					this.customer,
					TextContent.dispatch.status.DRIVER_ADDED_NAME_f(
						order.driver?.user.firstName as string,
					),
				);

				// send delivery info to driver
				this.messager.sendSMS({
					event: dispatchEvents.driver_added,
					phone: this.driver.phone,
					data: SMSTemplate.driver.delivery_info_f(order),
				});
				this.messager.sendSocketMessage({
					event: NavigateEvent.to_vendor,
					socketId: this.driver.socketId,
				});
			},
		);

		// share driver location with clients in the room
		this.on(dispatchEvents.send_location, (coordinates: [number, number]) => {
			this.messager.sendSocketMessage({
				event: dispatchEvents.send_location,
				socketId: this.customer.socketId,
				data: JSON.stringify({ coordinates }),
			});
		});

		// send events based on driver route segment
		this.on(
			dispatchEvents.navigate,
			(type: typeof NavigateEvent[keyof typeof NavigateEvent]) => {
				switch (type) {
					case NavigateEvent.to_vendor:
						break;

					case NavigateEvent.arrive_to_vendor:
						// message status to customer
						this.messager.sendSocketMessage({
							event: NavigateEvent.to_vendor,
							socketId: this.customer.socketId,
							data: TextContent.dispatch.status.DRIVER_ARRIVED_TO_VENDOR_f(
								this.order?.driver?.user.firstName as string,
							),
						});
						break;

					case NavigateEvent.pickup_product:
						// message status to customer
						this.messager.sendMessage(
							NavigateEvent.pickup_product,
							this.customer,
							TextContent.dispatch.status.DRIVER_PICKUP_PRODUCT_f(
								this.order?.driver?.user.firstName as string,
							),
						);
						// emit update order status
						this.emit(NavigateEvent.pickup_product, this.id);
						break;

					case NavigateEvent.to_customer:
						break;

					case NavigateEvent.arrive_to_customer:
						// message status to customer
						this.messager.sendMessage(
							NavigateEvent.arrive_to_customer,
							this.customer,
							TextContent.dispatch.status.DRIVER_ARRIVED_TO_CUSTOMER_f(
								this.order?.driver?.user.firstName as string,
							),
						);
						break;

					case NavigateEvent.deliver_product:
						// message status to customer
						// send sms to customer asking if they received delivery,
						// if they reply yes, emit customer-received-order event
						this.messager.sendMessage(
							NavigateEvent.deliver_product,
							this.customer,
							TextContent.dispatch.status.DELIVERY_COMPLETE,
						);
						// emit update order status
						this.emit(NavigateEvent.deliver_product, this.id);
						break;

					default:
						break;
				}
			},
		);

		// HOW ORDERS ARE SUCCESSFULLY CLOSED:
		// DRIVER CLIENT SENDS A PRODUCT DELIVEREY EVENT
		// CUSTOMER CLIENT SENDS A PRODUCT RECEIVED EVENT
		// BOTH EVENTS ARE LISTENED FOR IN THIS ROOM
		// WHEN BOTH EVENTS ARE RECEIVED, THE ROOM IS CLOSED

		this.on(dispatchEvents.customer_received_order, () => {
			this.emit(dispatchEvents.customer_received_order, this.id);
		});

		this.on(dispatchEvents.order_complete, () => {
			this.messager.sendAll(
				dispatchEvents.order_complete,
				clients,
				TextContent.dispatch.status.DELIVERY_COMPLETE,
			);
			this.close();
		});

		this.once(dispatchEvents.close_room, () => {
			this.close();
		});
	}
}

export default DeliverOrderRoom;
