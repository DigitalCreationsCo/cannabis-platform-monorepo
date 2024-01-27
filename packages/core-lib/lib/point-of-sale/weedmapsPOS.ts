import { type OrderWithDispatchDetails } from '@cd/data-access';
import { dummyProductVariants } from './dummyProductVariants';
import { type POSIntegration } from './integration.types';

const WeedmapsPOS: POSIntegration = class {
	static getWeedmapsEndpoint() {
		// assert value
		// return process.env.DUTCHIE_API_ENDPOINT;
	}

	static async getProduct(sku: string) {
		return await dummyProductVariants.find((product) => product.sku === sku);
	}

	static async getOrder(orderId: string) {
		return (await {}) as OrderWithDispatchDetails;
	}

	static async processPickupOrder(order: OrderWithDispatchDetails['order']) {
		try {
			return;
		} catch (error: any) {
			console.error(
				'weedmapsPOSIntegration processPickupOrder: ',
				error.message,
			);
			throw new Error(error.message);
		}
	}

	static async processDeliveryOrder(order: OrderWithDispatchDetails['order']) {
		try {
			return;
		} catch (error: any) {
			console.error(
				'weedmapsPOSIntegration processDeliveryOrder: ',
				error.message,
			);
			throw new Error(error.message);
		}
	}
};

export default WeedmapsPOS;
