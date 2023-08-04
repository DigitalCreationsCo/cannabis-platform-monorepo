import {
	type Order,
	type Organization,
	type Prisma,
	type ProductVariant,
	type Purchase,
	type User,
} from '@prisma/client';
import { type AddressWithCoordinates } from './address';
import prisma from './db/prisma';
import { type DriverWithDetails, type RouteWithCoordinates } from './driver';
import {
	connectVariantImages,
	createProductVariantsWithoutId,
	type ProductVariantWithDetails,
} from './variant';

/*
 *   createOrder
 *   createPurchase
 *   findOrdersByOrg
 *   findOrderWithDetails
 *   updateOrderWithOrderItems
 *   updateOrder
 */

export async function createOrder(order: any) {
	try {
		order.items = await createProductVariantsWithoutId(order?.items, order);

		await connectVariantImages(order?.items);

		// const {
		// 	coordinates,
		// 	userId,
		// 	coordinateId,
		// 	organizationId,
		// 	...destinationAddressData
		// } = order.destinationAddress;

		const itemsConnect = () =>
			order.items?.map((item: ProductVariantWithDetails) => ({ id: item.id }));

		const createOrder = await prisma.order.upsert({
			where: {
				id: order.id,
			},
			create: {
				id: order.id,
				subtotal: order.subtotal || order.total,
				total: order.total,
				taxFactor: order.taxFactor || 0,
				taxAmount: order.taxAmount || 0,
				orderStatus: order.orderStatus,
				addressId: order.addressId,
				customerId: order.customerId,
				organizationId: order.organizationId,
				driverId: order.driverId,
				isDeliveredOrder: order.isDeliveredOrder,
				isCustomerReceivedOrder: order.isCustomerReceivedOrder,
				isCompleted: order.isCompleted,
				deliveredAt: order.deliveredAt,
				purchaseId: order.purchaseId,
				items: {
					connect: itemsConnect(),
				},
				// customer: order.customer,
				// organization: order.organization,
				// destinationAddress: {
				//     connectOrCreate: {
				//         where: { id: order.destinationAddress.id },
				//         create: {
				//             ...destinationAddressData,
				//             coordinates: {
				//                 create: {
				//                     latitude: Number(coordinates?.latitude),
				//                     longitude: Number(coordinates?.longitude)
				//                 }
				//             }
				//         }
				//     }
				// }
			},
			update: {
				id: order.id,
				subtotal: order.subtotal || order.total,
				total: order.total,
				taxFactor: order.taxFactor || 0,
				taxAmount: order.taxAmount || 0,
				orderStatus: order.orderStatus,
				addressId: order.addressId,
				customerId: order.customerId,
				organizationId: order.organizationId,
				driverId: order.driverId,
				isDeliveredOrder: order.isDeliveredOrder,
				isCustomerReceivedOrder: order.isCustomerReceivedOrder,
				isCompleted: order.isCompleted,
				deliveredAt: order.deliveredAt,
				purchaseId: order.purchaseId,
				items: {
					connect: itemsConnect(),
				},
			},
		});

		return createOrder as OrderWithDetails;
	} catch (error: any) {
		console.error('create order error: ', error.message);
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
		console.error(error);
		throw new Error(error);
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

export type OrderUpdateType = Prisma.OrderUpdateArgs['data'];
export type OrderCreateType = Prisma.OrderUncheckedCreateInput & {
	organization: Organization;
};

export type OrderWithDetails = Order & {
	items: ProductVariantWithDetails[];
	customer: User;
	// purchase?: Prisma.PurchaseCreateNestedOneWithoutOrderInput
	// destinationAddress: Address;
};

export type OrderWithDashboardDetails = Order & {
	items: ProductVariantWithDetails[];
	customer: User;
	driver: DriverWithDetails | null;
	route: RouteWithCoordinates;
	// purchase: Prisma.PurchaseCreateNestedOneWithoutOrderInput
	purchase: Purchase;
	destinationAddress: AddressWithCoordinates;
};

export type PurchaseCreate = Prisma.PurchaseCreateArgs['data'];
