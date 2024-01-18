import { createId } from '@paralleldrive/cuid2';
import {
	type Order,
	type OrderStatus,
	type Organization,
	type Prisma,
	type Purchase,
	type User,
} from '@prisma/client';
import { type UserWithDetails } from 'user.data';
import { type AddressWithCoordinates } from './address.types';
import {
	type DriverWithDetails,
	type RouteWithCoordinates,
} from './driver.types';
import {
	type OrganizationWithDashboardDetails,
	type OrganizationWithShopDetails,
} from './organization.types';
import { type ProductVariantWithDetails } from './variant.data';

export class OrderClass {
	id: string;
	subtotal: number;
	total: number;
	taxFactor: number;
	taxAmount: number;
	orderStatus: OrderStatus;
	purchaseId: string | null;
	deliveryFee: number;
	mileageFee: number;
	platformFee: number;
	distance: number;
	duration: number | null;
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
	isDeliveredOnTime: boolean | null;

	items: ProductVariantWithDetails[];
	// eslint-disable-next-line sonarjs/cognitive-complexity
	constructor(order: OrderCreateType) {
		this.id = order.id || createId();
		this.deliveryFee = order.deliveryFee;
		this.mileageFee = order.mileageFee;
		this.platformFee = order.platformFee;
		this.distance = order.distance;
		this.duration = order.duration;
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
		this.isDeliveredOnTime = order.isDeliveredOnTime;
		this.items = order.items;
	}
}

export type OrderCreateType = Order & {
	organization: OrganizationWithShopDetails;
	customer: UserWithDetails;
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

export type OrderWithFullDetails = Order & {
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

export type OrderCreateMinimalFields = Omit<
	OrderCreateType,
	| 'distance'
	| 'mileageFee'
	| 'platformFee'
	| 'deliveryFee'
	| 'id'
	| 'deliveryDeadline'
	| 'isDriverAssigned'
	| 'driverAssignedAt'
	| 'isProductPickedUp'
	| 'productPickedUpAt'
	| 'isCustomerReceivedOrder'
	| 'customerReceivedOrderAt'
	| 'isDeliveredOrder'
	| 'deliveredAt'
	| 'isCompleted'
	| 'completedAt'
	| 'duration'
	| 'isDeliveredOnTime'
	| 'purchaseId'
	| 'routeId'
	| 'createdAt'
	| 'updatedAt'
	| 'driverId'
	| 'driver'
	| 'addressId'
	| 'orderStatus'
> &
	Partial<
		Pick<
			OrderCreateType,
			| 'distance'
			| 'mileageFee'
			| 'platformFee'
			| 'deliveryFee'
			| 'orderStatus'
			| 'addressId'
		>
	>;
