import { type ProductVariant } from '@prisma/client';
import prisma from './db/prisma';
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
 * deleteOrder
 */

export async function createOrder(order: OrderCreateType) {
	try {
		const _order = new OrderClass(order);
		const createdOrder = await prisma.order.create({
			data: { ..._order },
		});
		return createdOrder as OrderWithShopDetails;
	} catch (error: any) {
		console.error('create order: ', error);
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

export async function findOrdersByOrg(organizationId: string) {
	try {
		return (
			(await prisma.order.findMany({
				where: { organizationId },
				orderBy: [{ updatedAt: 'desc' }],
			})) || []
		);
	} catch (error: any) {
		console.error(error.message);
		throw new Error(error.message);
	}
}

export async function findOrderWithDetails(id: string) {
	try {
		const order: any = await prisma.order.findUnique({
			where: { id },
			include: {
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
		});
		return order;
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
						sku: Number(item.sku),
						size: Number(item.size),
						quantity: Number(item.quantity),
						basePrice: Number(item.basePrice),
						discount: Number(item.discount),
						salePrice: Number(item.salePrice),
						stock: Number(item.stock),
					},
					update: {
						...rest,
						sku: Number(item.sku),
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
