import { axios } from '@cd/core-lib';
import { type OrderWithFullDetails } from '@cd/data-access';
import { type POSIntegration } from './integration.types';

const BlazePOS: POSIntegration = class {
	static getBlaze() {
		// assert value
		// return process.env.DUTCHIE_API_ENDPOINT;
	}

	static async processPickupOrder(order: OrderWithFullDetails) {
		try {
			// await axios.post('https://api.dutchie.com/api/v1/orders', {});
			return;
		} catch (error: any) {
			console.error('blazePOSIntegration processPickupOrder: ', error.message);
			throw new Error(error.message);
		}
	}

	static async processDeliveryOrder(order: OrderWithFullDetails) {
		try {
			// const query = gql``;
			// await axios.post('https://api.dutchie.com/api/v1/orders', {});
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
