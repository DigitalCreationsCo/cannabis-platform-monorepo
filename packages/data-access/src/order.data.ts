import { type Prisma, type ProductVariant } from '@prisma/client';
import prisma from './db/prisma';
import { dispensaries } from './dispensaries.data';
import {
	OrderClass,
	type OrderCreateType,
	type OrderUpdateType,
	type OrderWithShopDetails,
} from './order.types';

/* METHODS
 * createOrder
 * createPurchase
 * findOrdersByOrg
 * findOrderWithDetails
 * updateOrderWithOrderItems
 * updateOrder
 * addDriverToOrder
 * deleteOrder
 */

export async function createOrder(order: OrderCreateType) {
	try {
		const _order = new OrderClass(order);

		// const _upsertItemsOp = _order.items.map((item) =>
		// 	prisma.productVariant.upsert({
		// 		where: { id: item.id ?? '' },
		// 		create: {
		// 			// ...item,
		// 			name: item.name,
		// 			sku: item.sku,
		// 			size: item.size,
		// 			quantity: item.quantity,
		// 			organizationId: _order.organization.id,
		// 			organizationName: _order.organization.name,
		// 			rating: 0,
		// 			discount: 0,
		// 			basePrice: item.basePrice,
		// 			salePrice: item.basePrice,
		// 			isDiscount: false,
		// 			stock: item.quantity,
		// 			currency: item.currency || 'USD',
		// 			product: {
		// 				connectOrCreate: {
		// 					where: { id: item.productId ?? '' },
		// 					create: {
		// 						name: item.name,
		// 						description: '',
		// 						rating: 0,
		// 						organization: { connect: { id: _order.organization.id } },
		// 					},
		// 				},
		// 			},
		// 			images:
		// 				(item.images && {
		// 					connectOrCreate: item.images.map((image) => ({
		// 						where: { id: image.id ?? '' },
		// 						create: { ...image },
		// 					})),
		// 				}) ||
		// 				undefined,
		// 		},
		// 		update: {
		// 			// ...item,
		// 			name: item.name,
		// 			sku: item.sku,
		// 			size: item.size,
		// 			quantity: item.quantity,
		// 			organizationId: _order.organization.id,
		// 			organizationName: _order.organization.name,
		// 			discount: 0,
		// 			basePrice: item.basePrice,
		// 			salePrice: item.basePrice,
		// 			isDiscount: item.isDiscount || false,
		// 			stock: item.quantity,
		// 			currency: item.currency || 'USD',
		// 		},
		// 	}),
		// );
		// const upsertItems = await prisma.$transaction([..._upsertItemsOp]);

		const createdOrder = await prisma.order.create({
			data: {
				// ..._order,
				subtotal: _order.subtotal,
				total: _order.total,
				taxFactor: _order.taxFactor,
				taxAmount: _order.taxAmount,
				deliveryDeadline: _order.deliveryDeadline,
				orderStatus: _order.orderStatus,
				organization: { connect: { id: _order.organization.id } },
				customer: { connect: { id: _order.customer.id } },
				destinationAddress: {
					connectOrCreate: {
						where: { id: _order.destinationAddress.id },
						create: {
							// ..._order.destinationAddress,
							street1: _order.destinationAddress.street1,
							street2: _order.destinationAddress.street2,
							city: _order.destinationAddress.city,
							state: _order.destinationAddress.state,
							zipcode: _order.destinationAddress.zipcode,
							country: _order.destinationAddress.country,
							countryCode: _order.destinationAddress.countryCode,
							coordinates: {
								create: {
									latitude: Number(
										_order.destinationAddress.coordinates?.latitude,
									),
									longitude: Number(
										_order.destinationAddress.coordinates?.longitude,
									),
									radius: 10000,
								},
							},
						},
					},
				},
				items: {
					connectOrCreate: _order.items.map((item) => ({
						where: { id: item.id ?? '' },
						create: {
							// ...item,
							name: item.name,
							sku: item.sku,
							size: item.size,
							product: {
								connectOrCreate: {
									where: { id: item.productId },
									create: {
										name: item.name,
										description: '',
										rating: 0,
										organization: { connect: { id: _order.organization.id } },
									},
								},
							},
							quantity: item.quantity,
							organization: {
								connect: { id: _order.organization.id },
							},
							// organizationId: _order.organization.id,
							// organizationName: _order.organization.name,
							rating: 0,
							discount: 0,
							basePrice: item.basePrice,
							salePrice: item.basePrice,
							isDiscount: false,
							stock: item.quantity,
							currency: item.currency || 'USD',
							images:
								(item.images && {
									connectOrCreate: item.images.map((image) => ({
										where: { id: image.id ?? '' },
										create: { ...image },
									})),
								}) ||
								undefined,
						},
					})),
				},
			},
			include: {
				items: true,
				customer: true,
				organization: true,
				destinationAddress: true,
			},
		});
		return createdOrder as OrderWithShopDetails;
	} catch (error: any) {
		console.error('create order: ', error);
		if (error.message.includes('Invalid `prisma_default.order.create()`'))
			throw new Error('Invalid order.');
		throw new Error(error.message);
	}
}

export async function createPurchase(purchase: any) {
	try {
		return await prisma.purchase.upsert({
			where: {
				id: purchase.id,
			},
			update: { ...purchase, order: { connect: { id: purchase.orderId } } },
			create: {
				...purchase,
				order: {
					connect: {
						id: purchase.orderId,
					},
				},
				customer: {
					connect: {
						id: purchase.customerId,
					},
				},
			},
		});
	} catch (error: any) {
		console.error(error.message);
		throw new Error(error.message);
	}
}

export async function findOrdersByUser(
	userId: string,
): Promise<OrderWithShopDetails[]> {
	try {
		return await prisma.order.findMany({
			where: { customerId: userId },
			orderBy: [{ updatedAt: 'desc' }],
			include: {
				customer: true,
				organization: true,
				destinationAddress: { include: { coordinates: true } },
				items: true,
			},
		});
	} catch (error: any) {
		console.error(error.message);
		throw new Error(error.message);
	}
}

export async function findOrdersByOrg(organizationId: string) {
	try {
		const dispensary = dispensaries.find(
			(dispensary) => dispensary.id === organizationId,
		);
		if (!dispensary) throw new Error('Organization not found');
		return dispensary.orders;
	} catch (error: any) {
		console.error(error.message);
		throw new Error(error.message);
	}
}

export async function findOrderWithDetails(
	id: string,
	include: Prisma.OrderInclude = {
		customer: true,
		driver: true,
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
		items: { include: { images: true } },
	},
) {
	try {
		return await prisma.order.findUnique({
			where: { id },
			include,
		});
	} catch (error: any) {
		console.error(error);
		throw new Error(error);
	}
}

export async function updateOrderWithOrderItems(order: any) {
	try {
		const updateOrderItemsOp =
			!!order.items &&
			order.items.map((item: ProductVariant) => {
				const { ...rest } = item;
				const variantId = item.id;
				return prisma.productVariant.upsert({
					where: { id: variantId },
					create: {
						...rest,
						sku: item.sku,
						size: Number(item.size),
						quantity: Number(item.quantity),
						basePrice: Number(item.basePrice),
						discount: Number(item.discount),
						salePrice: Number(item.salePrice),
						stock: Number(item.stock),
					},
					update: {
						...rest,
						sku: item.sku,
						size: Number(item.size),
						quantity: Number(item.quantity),
						basePrice: Number(item.basePrice),
						discount: Number(item.discount),
						salePrice: Number(item.salePrice),
						stock: Number(item.stock),
					},
				});
			});
		const connectOrderItems =
			(!!order.items &&
				order.items.map((item: ProductVariant) => ({ id: item.id }))) ||
			[];
		delete order['items'];
		const id = order.id;
		const updateOrderOp = prisma.order.update({
			where: { id },
			data: {
				...order,
				items: {
					connect: connectOrderItems,
				},
			},
		});
		await prisma.$transaction([...updateOrderItemsOp]);
		const updateOrder = await prisma.$transaction([updateOrderOp]);
		return updateOrder[0];
		return updateOrder[0];
	} catch (error: any) {
		console.error('error: ', error);
		throw new Error(error);
	}
}

/**
 * update Order
 * @param id order id
 * @param data fields to update
 * @returns
 */
export async function updateOrder(id: string, data: OrderUpdateType) {
	try {
		return await prisma.order.update({
			where: { id: id },
			data: { ...data },
		});
	} catch (error: any) {
		if (error.code === 'P2025') throw new Error(`Order is not found.`);
		throw new Error(error.message);
	}
}

export async function addDriverToOrder(id: string, driverId: string) {
	try {
		return await prisma.order.update({
			where: { id: id },
			data: {
				driver: {
					connect: {
						id: driverId,
					},
				},
				isDriverAssigned: true,
				driverAssignedAt: new Date(),
				orderStatus: 'OnDelivery',
			},
		});
	} catch (error: any) {
		console.error(error);
		if (error.code === 'P2025') throw new Error(error.meta.cause);
		throw new Error(error.message);
	}
}

/**
 * delete Order
 * @param id order id
 * @returns
 */
export async function deleteOrder(id: string) {
	try {
		return await prisma.order.delete({
			where: {
				id,
			},
		});
	} catch (error: any) {
		console.error(error.message);
		throw new Error(error.message);
	}
}
