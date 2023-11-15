import { axios } from '@cd/core-lib';
import { type OrderWithDispatchDetails } from '@cd/data-access';
import { type POSIntegration } from './integration.types';

const BlazePOS: POSIntegration = class {
	static async processSale(order: OrderWithDispatchDetails['order']) {
		try {
			await axios.post('https://api.dutchie.com/api/v1/orders', {});
		} catch (error: any) {
			console.error('dutchiePOSIntegration: ', error.message);
			throw new Error(error.message);
		}
	}
};

export default BlazePOS;
