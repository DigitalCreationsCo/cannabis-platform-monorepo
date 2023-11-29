import { axios } from '@cd/core-lib';
import { type OrderWithFullDetails } from '@cd/data-access';
import { type POSIntegration } from './integration.types';

const WeedmapsPOS: POSIntegration = class {
	static getWeedmapsEndpoint() {
		// assert value
		// return process.env.DUTCHIE_API_ENDPOINT;
	}

	static async processPickupOrder(order: OrderWithFullDetails) {
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

	static async processDeliveryOrder(order: OrderWithFullDetails) {
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
