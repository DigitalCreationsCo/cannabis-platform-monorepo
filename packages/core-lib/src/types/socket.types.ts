import { type OrderWithDispatchDetails } from '@cd/data-access';

export const dispatchEvents = Object.freeze({
	connection: 'connection',
	client_connect: 'client_connect',
	customer_connect: 'customer_connect',
	driver_connect: 'driver_connect',
	vendor_connect: 'vendor_connect',
	disconnect: 'disconnect',

	new_order: 'new_order',
	accept_order: 'accept_delivery_order',
	decline_order: 'decline_delivery_order',
	order_assigned: 'order_assigned',
	order_assigned_to_another_driver: 'order_assigned_to_another_driver',
	get_location: 'get_location',
	customer_received_order: 'customer_received_order',
	order_complete: 'order_complete',

	add_driver_to_record: 'add_driver_to_record',
	join_room: 'join_room',
	driver_added: 'driver_added',
	send_location: 'location_share',
	close_room: 'close',
	closed: 'closed',

	message: 'message',
	navigate: 'navigate',
});

export const NavigateEvent = Object.freeze({
	to_vendor: 'NAVIGATE_TO_VENDOR',
	arrive_to_vendor: 'ARRIVE_TO_VENDOR',
	pickup_product: 'PICKUP_PRODUCT',
	to_customer: 'NAVIGATE_TO_CUSTOMER',
	arrive_to_customer: 'ARRIVE_TO_CUSTOMER',
	deliver_product: 'DELIVER_PRODUCT',
});

export interface SocketEventPayload<T> {
	message: string | null;
	data?: T;
}

export type IncomingOrder = {
	newOrder: OrderWithDispatchDetails['order'] | null;
	message: string | null;
};
