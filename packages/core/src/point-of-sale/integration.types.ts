/* eslint-disable @typescript-eslint/no-unused-vars */
type OrderWithDispatchDetails = any;
type UserWithDetails = any;

export interface POSIntegration {
	// s2sIntegration: Inventory;
	getOrder: (
		orderId: string
	) => Promise<OrderWithDispatchDetails['order'] | undefined>;
	getProduct: (sku: string) => Promise<any | undefined>;
	getCustomerByPhone: (phone: string) => Promise<UserWithDetails | undefined>;
	processPickupOrder: (
		order: OrderWithDispatchDetails['order']
	) => Promise<void>;
	processDeliveryOrder: (
		order: OrderWithDispatchDetails['order']
	) => Promise<void>;
}
