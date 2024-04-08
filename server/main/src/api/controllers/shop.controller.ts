/* eslint-disable sonarjs/no-duplicated-branches */
import { pruneData, TextContent, IntegrationService } from '@cd/core-lib';
import {
	type OrderWithFullDetails,
	type OrderCreateType,
	type OrderWithDispatchDetails,
} from '@cd/data-access';
import { createId } from '@paralleldrive/cuid2';
import { ShopDA } from '../data-access';

/* =================================
ShopController - controller class for ecommerce business actions

members:

processOrder

createOrder
fulfillOrderAndStartDispatch
getOrdersByOrganization
getOrderById
updateOrderById

getProductsByMultipleOrgs
getProductsByOrg
getProductById
searchProducts

================================= */

export default class ShopController {
	static async createOrder(req, res) {
		try {
			const order: OrderCreateType = req.body;
			console.info('create order input: ', order);
			const createdOrder = await ShopDA.createOrder(order);
			return res.status(201).json({
				success: 'true',
				message: 'Order created Successfully',
				payload: createdOrder,
			});
		} catch (error: any) {
			console.error('createOrder: ', error);
			return res.status(500).json({ success: 'false', error: error.message });
		}
	}

	// MAKE THIS WORK FOR FULFILLMENT, and DISPATCH
	// UPDATE ORDER TO DB USER AND ORGANIZATION, THEN SEND TO DISPATCH SERVER TO FULFILL
	// SAVE ANY PROCESS THAT IS NOT BEING USED CURRENTLY, LIKE AFFECTING STOCK AND STRIPE PAYMENT / SENDING EMAIL, ETC.
	/**
	 * Update OrderStatus and send to Dispatch server for delivery processing
	 * @param req
	 * @param res
	 * @returns
	 */
	static async fulfillOrder(req, res) {
		try {
			console.log('fulfillOrder: ', req.body);
			const orderId: string = req.body.orderId;
			const order = (await ShopDA.getOrderById(orderId, {
				customer: true,
				driver: true,
				items: true,
				organization: {
					include: {
						address: {
							include: {
								coordinates: true,
							},
						},
					},
				},
				destinationAddress: true,
				route: true,
			})) as unknown as OrderWithDispatchDetails['order'];

			// update order status
			await ShopDA.updateOrderFulfillmentStatus(orderId, 'Processing');

			const POSIntegration = await IntegrationService.getPOSIntegrationService(
				order.organization.pos,
			);

			switch (order.type) {
				case 'delivery':
					await POSIntegration.processDeliveryOrder(order);
					await ShopDA.addDispatchOrderMongo(pruneData(order, ['items']));
					break;
				case 'pickup':
					await POSIntegration.processPickupOrder(order);
					// no dispatch order is necessary for pickup
					break;
				default: // delivery
					await POSIntegration.processDeliveryOrder(order);
					await ShopDA.addDispatchOrderMongo(pruneData(order, ['items']));
					break;
			}

			return res.status(201).json({
				success: 'true',
				message: `Order fulfillment acknowledged. Dispatch order created successfully`,
			});
		} catch (error: any) {
			console.info('fulfillOrderAndStartDispatch: ', error);
			if (error.message === TextContent.error.ORDER_NOT_FOUND)
				return res.status(404).json({ success: 'false', error: error.message });
			return res.status(500).json({ success: 'false', error: error.message });
		}
	}

	/**
	 * Update OrderStatus and send to Dispatch server for delivery processing
	 * @param req
	 * @param res
	 * @returns
	 */
	static async testFulfillmentOrder(req, res) {
		try {
			const order: OrderWithFullDetails = req.body;
			order.id = createId();
			await ShopDA.addDispatchOrderMongo(order);

			return res.status(201).json({
				success: 'true',
				message: `Test Dispatch order created successfully. OrderId: ${order.id}`,
			});
		} catch (error: any) {
			console.info('testFulfillmentOrder: ', error);
			return res.status(500).json({ success: 'false', error: error.message });
		}
	}

	// static async processOrder (req, res) {
	//     // order fulfillment function
	//     // create Order record, add order to user record, add order to dispensary,
	//     // decrement item stock - NOT IMPLEMENT YET
	//     try {
	//         let orderPayload:OrderCreate = req.body.order
	//         let order:OrderWithDetails
	//         let charge = req.body.charge

	//         // create payment record
	//         // add order to user record, add order to dispensary,
	//         // decrement item stock
	//         const purchase = await ShopDA.createPurchase({
	//             orderId: orderPayload.id,
	//             gateway: "stripe",
	//             type: charge.payment_method_details.type,
	//             amount: charge.amount / 100,
	//             token: charge.id,
	//             createdAt: new Date(),
	//             updatedAt: new Date(),
	//         });

	//         order = await ShopDA.createOrder({
	//             ...orderPayload,
	//             purchaseId: purchase.id,
	//             orderStatus: 'Processing'
	//         })

	//         // decrement the product stock
	// order.items.forEach(async (item) => {
	//     const updateProductVariantQuantity = await ProductDA.updateProductVariantQuantity(item.variantId, item.quantity)
	// })

	//         return res.status(201).json({ message: "Order created Successfully" });

	//     } catch (error: any) {
	//         console.info('API error shopcontroller: createOrder: ', error);
	//         res.status(500).json({ error });
	//   }
	// }

	static async getOrdersByOrganization(req, res) {
		try {
			const organizationId = req.params.id || {};
			const data = await ShopDA.getOrdersByOrganization(organizationId);
			if (!data)
				return res
					.status(404)
					.json({ success: 'false', error: 'Orders not found' });
			return res.status(200).json({ success: 'true', payload: data });
		} catch (error: any) {
			console.error('getOrdersByOrg api: ', error);
			return res.status(500).json({ success: 'false', error: error.message });
		}
	}

	static async getOrderById(req, res) {
		try {
			const id = req.params.id || '';
			const data = await ShopDA.getOrderById(id);
			// this is the preferred pattern for controller responses VV
			// across ALL apps and systems
			if (!data) return res.status(404).json('Order not found');
			return res.status(200).json(data);
		} catch (error: any) {
			console.info('getOrderById api: ', error);
			return res.status(500).json({ error });
		}
	}

	static async updateOrderById(req, res) {
		try {
			const order = req.body;
			const data = await ShopDA.updateOrderById(order);
			if (!data) return res.status(400).json('Could not update');
			return res.status(200).json(data);
		} catch (error: any) {
			console.info('updateOrderById api: ', error);
			return res.status(500).json({ error });
		}
	}

	static async getProductsByOrg(req, res) {
		try {
			const organizationId = req.params.id || {};

			const data = await ShopDA.getProductsByOrg(organizationId);
			if (!data) return res.status(404).json('Products not found');
			return res.status(200).json(data);
		} catch (error: any) {
			console.info('getProductsByOrg api: ', error);
			res.status(500).json({ error });
		}
	}

	static async getProductsByMultipleOrgs(req, res) {
		try {
			const idList = req.body || [];
			const { page, limit } = req.params;

			const data = await ShopDA.getProductsByOrg(idList, page, limit);
			if (!data) return res.status(404).json('Products not found');
			return res.status(200).json(data);
		} catch (error: any) {
			console.info('getProductsByMultipleOrgs api: ', error);
			return res.status(500).json({ error });
		}
	}

	static async getProductById(req, res) {
		try {
			const id = req.params.id || '';
			const data = await ShopDA.getProductById(id);
			// this is the preferred pattern for controller responses VV
			// across ALL apps and systems
			if (!data) return res.status(404).json('Product not found');
			return res.status(200).json(data);
		} catch (error: any) {
			console.info('getProductById api: ', error);
			return res.status(500).json({ error });
		}
	}

	static async searchProducts(req, res) {
		try {
			const { search, organizationId } = req.body;
			const data = await ShopDA.searchProducts(search, organizationId);
			if (!data) return res.status(404).json('Products Not Found');
			return res.status(200).json(data);
		} catch (error: any) {
			console.info('searchProducts api: ', error);
			return res.status(500).json({ error });
		}
	}
}
