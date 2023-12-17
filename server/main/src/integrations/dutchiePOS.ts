import { type OrderWithFullDetails } from '@cd/data-access';
import { gql, createClient } from '@urql/core';
import { type POSIntegration } from './integration.types';

const DutchiePOS: POSIntegration = class {
	static getDutchieEndpoint() {
		// assert value
		// return process.env.DUTCHIE_API_ENDPOINT;
	}

	static async processPickupOrder(order: OrderWithFullDetails) {
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

	static async processDeliveryOrder(order: OrderWithFullDetails) {
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
