import { createId } from '@paralleldrive/cuid2';
import {
	type Order,
	type OrderStatus,
	type Organization,
	type Prisma,
	type ProductVariant,
	type Purchase,
	type User,
} from '@prisma/client';
import { type AddressWithCoordinates } from './address';
import prisma from './db/prisma';
import { type DriverWithDetails, type RouteWithCoordinates } from './driver';
import { type ProductVariantWithDetails } from './variant';

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
		const _createdOrder = new OrderClass(order);
		await prisma.order.create({
			data: { ..._createdOrder },
		});
		return _createdOrder as OrderWithDetails;
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
	customer: User;
	destinationAddress: AddressWithCoordinates;
};

export type OrderWithDetails = Order & {
	items: ProductVariantWithDetails[];
	customer: User;
	organization?: Organization;
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

class OrderClass {
	id: string;
	subtotal: number;
	total: number;
	taxFactor: number;
	taxAmount: number;
	orderStatus: OrderStatus;
	purchaseId: string | null;
	addressId: string;
	customerId: string;
	organizationId: string;
	routeId: string | null;
	driverId: string | null;
	isDriverAssigned: boolean;
	driverAssignedAt: Date | string | null;
	isProductPickedUp: boolean;
	productPickedUpAt: Date | string | null;
	isCustomerReceivedOrder: boolean;
	customerReceivedOrderAt: Date | string | null;
	isDeliveredOrder: boolean;
	deliveredAt: Date | string | null;
	isCompleted: boolean;
	completedAt: Date | string | null;
	createdAt: Date;
	updatedAt: Date;
	// eslint-disable-next-line sonarjs/cognitive-complexity
	constructor(order: OrderCreateType) {
		this.id = order.id || createId();
		this.subtotal = order.subtotal || order.total;
		this.total = order.total;
		this.taxFactor = order.taxFactor || 0;
		this.taxAmount = order.taxAmount || 0;
		this.orderStatus = order.orderStatus || 'Pending';
		this.purchaseId = order.purchaseId || null;
		this.addressId = order.addressId;
		this.customerId = order.customerId;
		this.organizationId = order.organizationId;
		this.routeId = order.routeId || null;
		this.driverId = order.driverId || null;
		this.isDriverAssigned = order.isDriverAssigned || false;
		this.driverAssignedAt = order.driverAssignedAt || null;
		this.productPickedUpAt = order.productPickedUpAt || null;
		this.isProductPickedUp = order.isProductPickedUp || false;
		this.isCustomerReceivedOrder = order.isCustomerReceivedOrder || false;
		this.customerReceivedOrderAt = order.customerReceivedOrderAt || null;
		this.isDeliveredOrder = order.isDeliveredOrder || false;
		this.deliveredAt = order.deliveredAt || null;
		this.isCompleted = order.isCompleted || false;
		this.completedAt = order.completedAt || null;
		this.createdAt = new Date();
		this.updatedAt = new Date();
	}
}
