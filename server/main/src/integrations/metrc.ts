import { axios } from '@cd/core-lib';
import { type OrderWithDispatchDetails } from '@cd/data-access';
import { type POSIntegration } from './integration.types';

const MetrcIntegration: POSIntegration = class {
	static async processSale(order: OrderWithDispatchDetails['order']) {
		try {
			await axios.post('https://api.dutchie.com/api/v1/orders', {});
		} catch (error: any) {
			console.error('Metrc Integration: ', error.message);
			throw new Error(error.message);
		}
	}
};

export default MetrcIntegration;
