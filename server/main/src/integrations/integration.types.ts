import { type OrderWithDispatchDetails } from '@cd/data-access';

export interface POSIntegration {
	processSale: (order: OrderWithDispatchDetails['order']) => Promise<void>;
}
