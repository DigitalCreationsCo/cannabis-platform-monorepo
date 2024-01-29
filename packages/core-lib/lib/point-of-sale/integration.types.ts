import {
	type ProductVariantWithDetails,
	type OrderWithDispatchDetails,
	UserWithDetails,
} from '@cd/data-access';

export interface POSIntegration {
	// s2sIntegration: Inventory;
	getOrder: (
		orderId: string,
	) => Promise<OrderWithDispatchDetails['order'] | undefined>;
	getProduct: (sku: string) => Promise<ProductVariantWithDetails | undefined>;
	getCustomerByPhone: (phone: string) => Promise<UserWithDetails | undefined>;
	processPickupOrder: (
		order: OrderWithDispatchDetails['order'],
	) => Promise<void>;
	processDeliveryOrder: (
		order: OrderWithDispatchDetails['order'],
	) => Promise<void>;
}
