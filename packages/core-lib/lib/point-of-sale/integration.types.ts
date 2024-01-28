import {
	type ProductVariantWithDetails,
	type OrderWithDispatchDetails,
} from '@cd/data-access';

export interface POSIntegration {
	// s2sIntegration: Inventory;
	getOrder: (
		orderId: string,
	) => Promise<OrderWithDispatchDetails['order'] | undefined>;
	getProduct: (sku: string) => Promise<ProductVariantWithDetails | undefined>;
	processPickupOrder: (
		order: OrderWithDispatchDetails['order'],
	) => Promise<void>;
	processDeliveryOrder: (
		order: OrderWithDispatchDetails['order'],
	) => Promise<void>;
}
