import { OrderWithDetails } from '@cd/data-access';

const SocketEvent = Object.freeze({
	Connection: 'connection',
	CustomerConnect: 'customer_connect',
	DriverConnect: 'driver_connect',
	VendorConnect: 'vendor_connect',
	ClientConnect: 'client_connect',
	Disconnect: 'disconnect',

	NewOrder: 'new_order',
	AcceptOrder: 'accept_delivery_order',
	DeclineOrder: 'decline_delivery_order',
	OrderAssignedToYou: 'order_assigned',
	OrderAssignedToAnotherDriver: 'order_assigned_to_another_driver',
	GetLocation: 'get_location',

	DriverAdded: 'driver_added',
	SendLocation: 'location_share',

	Message: 'message',
	Navigate: 'navigate',
});

const NavigateEvent = Object.freeze({
	ToVendor: 'NAVIGATE_TO_VENDOR',
	ToCustomer: 'NAVIGATE_TO_CUSTOMER',
	ArriveToVendor: 'ARRIVE_TO_VENDOR',
	PickupProduct: 'PICKUP_PRODUCT',
	ArriveToCustomer: 'ARRIVE_TO_CUSTOMER',
	DeliverOrder: 'DELIVER_PRODUCT',
});

interface SocketEventPayload<T> {
	message: string | null;
	data?: T;
}

type IncomingOrder = {
	newOrder: OrderWithDetails | null;
	message: string | null;
};

export { SocketEvent, NavigateEvent };
export type { SocketEventPayload, IncomingOrder };
