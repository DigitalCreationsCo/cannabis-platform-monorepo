import { urlBuilder } from '@cd/core-lib';
import { type OrderWithShopDetails } from '@cd/data-access';
import axios from 'axios';

/* =================================
Payment Data Access - data class for order table

members: 
processPurchase

================================= */

export default class PaymentDA {
	static async saveOrder(order: OrderWithShopDetails) {
		try {
			await axios.post(urlBuilder.main.orders(), order);
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
