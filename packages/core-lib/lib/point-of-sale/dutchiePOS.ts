import { type OrderWithDispatchDetails } from '@cd/data-access';
import { variants } from '../../src/dummyData';
import { type POSIntegration } from './integration.types';

const DutchiePOS: POSIntegration = class {
	static getDutchieEndpoint() {
		// assert value
		// return process.env.DUTCHIE_API_ENDPOINT;
	}

	static async getProduct(sku: string) {
		return await variants.find((product) => product.sku === sku);
	}

	static async getOrder(orderId: string) {
		return (await {}) as OrderWithDispatchDetails['order'];
	}

	static async processPickupOrder(order: OrderWithDispatchDetails['order']) {
		try {
			// const client = createClient({
			// 	url: process.env.DUTCHIE_API_ENDPOINT +
			// 	fetchOptions: {
			// 		headers: { authorization: 'Bearer ' + process.env.DUTCHIE_API_KEY },
			// 	},
			// });
			// const query = gql``;
			return;
		} catch (error: any) {
			console.error(
				'dutchiePOSIntegration processPickupOrder: ',
				error.message,
			);
			throw new Error(error.message);
		}
	}

	static async processDeliveryOrder(order: OrderWithDispatchDetails['order']) {
		try {
			// const query = gql``;
			return;
		} catch (error: any) {
			console.error(
				'dutchiePOSIntegration processDeliveryOrder: ',
				error.message,
			);
			throw new Error(error.message);
		}
	}
};

export default DutchiePOS;
