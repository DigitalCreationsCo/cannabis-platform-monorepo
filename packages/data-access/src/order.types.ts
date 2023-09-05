import { createId } from '@paralleldrive/cuid2';
import {
	type Order,
	type OrderStatus,
	type Organization,
	type Prisma,
	type Purchase,
	type User,
} from '@prisma/client';
import { type AddressWithCoordinates } from './address.types';
import {
	type DriverWithDetails,
	type RouteWithCoordinates,
} from './driver.types';
import { type OrganizationWithDashboardDetails } from './organization.types';
import { type ProductVariantWithDetails } from './variant';

export class OrderClass {
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

export type OrderCreateType = Order & {
	organization: Organization;
	customer: User;
	destinationAddress: AddressWithCoordinates;
};

export type OrderUpdateType = Prisma.OrderUpdateArgs['data'];

export type OrderWithShopDetails = Order & {
	items: ProductVariantWithDetails[];
	customer: User;
	organization?: Organization;
	destinationAddress: AddressWithCoordinates;
};

export type OrderWithDashboardDetails = Order & {
	items: ProductVariantWithDetails[];
	customer: User;
	organization: OrganizationWithDashboardDetails;
	driver: DriverWithDetails | null;
	route: RouteWithCoordinates;
	purchase: Purchase;
	destinationAddress: AddressWithCoordinates;
};

export type OrderWithDispatchDetails = Order & {
	items: ProductVariantWithDetails[];
	customer: User;
	organization: OrganizationWithDashboardDetails;
	driver: DriverWithDetails | null;
	route: RouteWithCoordinates;
	purchase: Purchase;
	destinationAddress: AddressWithCoordinates;
};

export type PurchaseCreate = Prisma.PurchaseCreateArgs['data'];
