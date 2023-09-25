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
	// addressId: string;
	customer: User;
	destinationAddress: AddressWithCoordinates;
	// customerId: string;
	organization: Organization;
	// organizationId: string;
	routeId: string | null;
	// driverId: string | null;
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
	deliveryDeadline: Date;
	items: ProductVariantWithDetails[];
	// eslint-disable-next-line sonarjs/cognitive-complexity
	constructor(order: OrderCreateType) {
		this.id = order.id || createId();
		this.subtotal = order.subtotal || order.total;
		this.total = order.total;
		this.taxFactor = order.taxFactor || 0;
		this.taxAmount = order.taxAmount || 0;
		this.orderStatus = order.orderStatus || 'Pending';
		this.purchaseId = order.purchaseId || null;
		this.customer = order.customer;
		// this.addressId = order.addressId;
		this.destinationAddress = order.destinationAddress;
		// this.customerId = order.customerId;
		// this.organizationId = order.organizationId;
		this.organization = order.organization;
		this.routeId = order.routeId || null;
		// this.driverId = order.driverId || null;
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
		this.createdAt = order.createdAt || new Date();
		this.updatedAt = order.updatedAt || new Date();
		this.deliveryDeadline = order.deliveryDeadline;
		this.items = order.items;
	}
}

export type OrderCreateType = Order & {
	organization: Organization;
	customer: User;
	destinationAddress: AddressWithCoordinates;
	items: ProductVariantWithDetails[];
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

export type PurchaseCreate = Prisma.PurchaseCreateArgs['data'];

export type OrderWithDispatchDetails = {
	order: Order & {
		customer: User;
		organization: OrganizationWithDashboardDetails;
		driver: DriverWithDetails | null;
		route: RouteWithCoordinates;
		destinationAddress: AddressWithCoordinates;
	};
	queueStatus: {
		status: DispatchQueueStatus;
		createdAt: Date;
		nextReevaluation: Date | null;
	}[];
};

export type DispatchQueueStatus =
	| 'Inqueue'
	| 'Dispatching'
	| 'Dispatched'
	| 'Failed';
