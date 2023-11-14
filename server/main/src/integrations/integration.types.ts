import { type OrderWithDispatchDetails } from '@cd/data-access';

export interface POSIntegration {
	processPickupOrder: (
		order: OrderWithDispatchDetails['order'],
	) => Promise<void>;
	processDeliveryOrder: (
		order: OrderWithDispatchDetails['order'],
	) => Promise<void>;
}
