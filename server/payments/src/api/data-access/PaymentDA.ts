import { axios, urlBuilder } from '@cd/core-lib';
import { type OrderWithShopDetails } from '@cd/data-access';

/* =================================
Payment Data Access - data class for order table

members: 
processPurchase

================================= */

export default class PaymentDA {
	static async saveOrder(order: OrderWithShopDetails) {
		try {
			const response = await axios.post(urlBuilder.main.orders(), order);
			if (response.data.success !== 'true')
				throw new Error(response.data.error);
			const _order = response.data.payload as OrderWithShopDetails;
			console.info('saveOrder: ', _order);
			return _order;
		} catch (error: any) {
			console.error(error.message);
			throw new Error(error.message);
		}
	}

	static async startFulfillment(orderId: string) {
		try {
			await axios.post(urlBuilder.main.fulfillOrder(), { orderId });
		} catch (error: any) {
			console.error(error.message);
			throw new Error(error.message);
		}
	}
}
