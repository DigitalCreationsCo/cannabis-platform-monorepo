export const events = Object.freeze({
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
	getLocation: 'get_location',

	join_room: 'join_room',
	driver_added: 'driver_added',
	send_location: 'location_share',

	message: 'message',
	navigate: 'navigate',
});

export const NavigateEventType = Object.freeze({
	to_vendor: 'NAVIGATE_TO_VENDOR',
	to_customer: 'NAVIGATE_TO_CUSTOMER',
	arrive_to_vendor: 'ARRIVE_TO_VENDOR',
	pickup_product: 'PICKUP_PRODUCT',
	arrive_customer: 'ARRIVE_TO_CUSTOMER',
	deliver_product: 'DELIVER_PRODUCT',
});
