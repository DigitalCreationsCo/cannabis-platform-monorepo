import { type OrderWithDispatchDetails } from '@cd/data-access';

export const SocketEvent = Object.freeze({
	Connection: 'connection',
	CustomerConnect: 'customer_connect',
	DriverConnect: 'driver_connect',
	VendorConnect: 'vendor_connect',
	ClientConnect: 'client_connect',
	Disconnect: 'disconnect',

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
	ToVendor: 'NAVIGATE_TO_VENDOR',
	ToCustomer: 'NAVIGATE_TO_CUSTOMER',
	ArriveToVendor: 'ARRIVE_TO_VENDOR',
	PickupProduct: 'PICKUP_PRODUCT',
	ArriveToCustomer: 'ARRIVE_TO_CUSTOMER',
	DeliverOrder: 'DELIVER_PRODUCT',
});

export interface SocketEventPayload<T> {
	message: string | null;
	data?: T;
}

export type IncomingOrder = {
	newOrder: OrderWithDispatchDetails['order'] | null;
	message: string | null;
};
