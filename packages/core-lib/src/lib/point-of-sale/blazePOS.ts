import {
	type UserWithDetails,
	type OrderWithDispatchDetails,
} from '@cd/data-access';
import { variants } from '../../dummyData';
import { type POSIntegration } from './integration.types';

const BlazePOS: POSIntegration = class {
	static getBlaze() {
		// assert va lue
		// return process.env.DUTCHIE_API_ENDPOINT;
	}

	static async getProduct(sku: string) {
		return await variants.find((product) => product.sku === sku);
	}

	static async getOrder(orderId: string) {
		return (await {}) as OrderWithDispatchDetails['order'];
	}

	static async getCustomerByPhone(phone: string) {
		return (await {}) as UserWithDetails;
	}

	static async processPickupOrder(order: OrderWithDispatchDetails['order']) {
		try {
			// await axios.post('https://api.blaze', {});
			return;
		} catch (error: any) {
			console.error('blazePOSIntegration processPickupOrder: ', error.message);
			throw new Error(error.message);
		}
	}

	static async processDeliveryOrder(order: OrderWithDispatchDetails['order']) {
		try {
			// await axios.post('https://api.blaze', {});
			return;
		} catch (error: any) {
			console.error(
				'blazePOSIntegration processDeliveryOrder: ',
				error.message,
			);
			throw new Error(error.message);
		}
	}
};

export default BlazePOS;
