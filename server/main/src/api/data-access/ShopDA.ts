/* eslint-disable sonarjs/no-duplicated-branches */
import {
	calculateDeliveryDeadline,
	calculateTransactionFees,
	getGeoCoordinatesFromAddress,
	isEmpty,
} from '@cd/core-lib';
import {
	createOrder,
	createPurchase,
	findOrdersByOrg,
	findOrdersByUser,
	findOrderWithDetails,
	findProductsByOrg,
	findProductsByText,
	findProductWithDetails,
	updateOrder,
	updateOrderWithOrderItems,
	updateVariantQuantity,
	type OrderCreateType,
	type OrderStatus,
	type OrderWithDispatchDetails,
	type OrderWithShopDetails,
	type Prisma,
	type PurchaseCreate,
} from '@cd/data-access';
import { type MongoClient } from 'mongodb';

/* =================================
Order Data Access - Data class for Order SQL Table and dispatchOrders Mongo Collection

members: 
useMongoDB
createOrder
createPurchase

getOrdersByUser
getOrdersByOrganization
getOrderById
updateOrderById
updateOrderFulfillmentStatus
addDispatchOrderMongo

getProductsByOrg
getProductById
searchProducts
updateProductVariantQuantity

================================= */

let dispatchOrders;

const dispatch_namespace = process.env.DISPATCH_DB_NS;

export default class ShopDA {
	static async useMongoDB(mongoClient: MongoClient) {
		try {
			if (!dispatchOrders)
				dispatchOrders = await mongoClient
					.db(dispatch_namespace)
					.collection('dispatch_orders');

			return;
		} catch (e: any) {
			console.error(`Unable to establish collection handle in ShopDA: ${e}`);
			throw new Error(
				`Unable to establish collection handle in ShopDA: ${e.message}`,
			);
		}
	}

	static async createOrder(
		order: OrderCreateType,
	): Promise<OrderWithShopDetails> {
		try {
			order.deliveryDeadline = calculateDeliveryDeadline();
			order.orderStatus = 'Pending';
			calculateTransactionFees(order);
			if (isEmpty(order.destinationAddress.coordinates)) {
				const coordinates = await getGeoCoordinatesFromAddress(
					order.destinationAddress,
				);
				order.destinationAddress.coordinates = { ...coordinates };
			}
			return await createOrder(order);
		} catch (error: any) {
			console.error(error.message);
			throw new Error(error.message);
		}
	}

	static async createPurchase(purchase: PurchaseCreate) {
		try {
			return await createPurchase(purchase);
		} catch (error: any) {
			console.error(error.message);
			throw new Error(error.message);
		}
	}

	static async getOrdersByUser(userId: string) {
		try {
			return await findOrdersByUser(userId);
		} catch (error: any) {
			console.error(error.message);
			throw new Error(error.message);
		}
	}

	static async getOrdersByOrganization(organizationId: string) {
		try {
			return await findOrdersByOrg(organizationId);
		} catch (error: any) {
			console.error(error.message);
			throw new Error(error.message);
		}
	}

	static async getOrderById(id, include?: Prisma.OrderInclude) {
		try {
			return await findOrderWithDetails(id, include);
		} catch (error: any) {
			console.error(error.message);
			throw new Error(error.message);
		}
	}

	static async updateOrderById(order) {
		try {
			return await updateOrderWithOrderItems(order);
		} catch (error: any) {
			console.error(error.message);
			throw new Error(error.message);
		}
	}

	static async getProductsByOrg(
		organizationIdList: string | string[],
		page = 1,
		limit = 20,
	) {
		try {
			const idList = Array.isArray(organizationIdList)
				? organizationIdList
				: [organizationIdList];

			return await findProductsByOrg(idList, page, limit);
		} catch (error: any) {
			console.error(error.message);
			throw new Error(error.message);
		}
	}

	static async getProductById(id) {
		try {
			return await findProductWithDetails(id);
		} catch (error: any) {
			console.error(error.message);
			throw new Error(error.message);
		}
	}

	static async searchProducts(search, organizationId = null) {
		try {
			return await findProductsByText(search, organizationId);
		} catch (error: any) {
			console.error(error.message);
			throw new Error(error.message);
		}
	}

	static async updateProductVariantQuantity(
		variantId: string,
		quantity: number,
	) {
		try {
			return await updateVariantQuantity(variantId, quantity, '-');
		} catch (error: any) {
			console.error(error.message);
			throw new Error(error.message);
		}
	}

	static async updateOrderFulfillmentStatus(
		orderId: string,
		orderStatus: OrderStatus,
	) {
		try {
			return await updateOrder(orderId, { orderStatus });
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	static async addDispatchOrderMongo(order: OrderWithDispatchDetails['order']) {
		try {
			await dispatchOrders.insertOne({
				order,
				// add collection queueing metadata
				queueStatus: [
					{
						status: 'Inqueue',
						createdAt: new Date(),
						nextReevaluation: null,
					},
				],
			});
			console.info(
				`inserted order ${order.id} into dispatch_orders collection`,
			);
			return;
		} catch (error: any) {
			console.error('addDispatchRecordMongo error: ', error.message);

			if (error.code === 11000) throw new Error('Order exists already!');

			throw new Error(error.message);
		}
	}
}
