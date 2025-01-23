/* eslint-disable @typescript-eslint/no-unused-vars */
type OrderWithDispatchDetails = any;
type UserWithDetails = any;
import { type POSIntegration } from './integration.types';

export const DutchiePOS: POSIntegration = class {
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

	static async getCustomerByPhone(phone: string) {
		return (await {}) as UserWithDetails;
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
				error.message
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
				error.message
			);
			throw new Error(error.message);
		}
	}
};

const variants: any[] = [
	{
		id: '1',
		name: 'King OG',
		unit: 'g',
		size: 3.5,
		currency: 'USD',
		basePrice: 6999,
		discount: 10,
		stock: 5,
		productId: '1',
		organizationId: 'bf346k4u7x2b2hhr6wsofppp',
		rating: 4.5,
		organizationName: 'Golden Nugget Dispensary',
		quantity: 3,
		isDiscount: true,
		salePrice: 6499,
		sku: '123',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: '2',
		name: 'King OG',
		unit: 'g',
		size: 9,
		currency: 'USD',
		basePrice: 17999,
		discount: 5,
		rating: 4.5,
		stock: 9,
		productId: '1',
		organizationId: 'bf346k4u7x2b2hhr6wsofppp',
		organizationName: 'Golden Nugget Dispensary',
		quantity: 3,
		isDiscount: true,
		salePrice: 6499,
		sku: '234',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: '3',
		name: 'Blackberry Kush',
		unit: 'g',
		size: 3.5,
		currency: 'USD',
		basePrice: 6999,
		discount: 5,
		stock: 5,
		productId: '2',
		organizationId: 'bf346k4u7x2b2hhr6wvgippp',
		rating: 4.5,
		organizationName: 'Curaleaf MD Reisterstown',
		quantity: 3,
		isDiscount: true,
		salePrice: 6499,
		sku: '1234567',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: '4',
		name: 'Blackberry Nuggs',
		unit: 'g',
		size: 3.5,
		currency: 'USD',
		basePrice: 6999,
		discount: 5,
		stock: 5,
		productId: '3',
		organizationId: 'bf346k4u7x2b2hhr6wvgippp',
		organizationName: 'Curaleaf MD Reisterstown',
		quantity: 3,
		isDiscount: true,
		rating: 4.5,
		salePrice: 6499,
		sku: '1234567',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
];
