import {
	type SubscriptionPlan,
	type Category,
	type CategoryList,
	type Coordinates,
	type ImageOrganization,
	type Order,
	type Organization,
	type Prisma,
	type Schedule,
	type SiteSetting,
	type SubDomain,
	type Vendor,
} from '@prisma/client';
import { type ObjectId } from 'mongodb';
import {
	type AddressPayload,
	type AddressWithCoordinates,
} from '../address.types';
import {
	type ProductWithDashboardDetails,
	type ProductWithShopDetails,
} from '../product/product.data';
import { type MembershipWithUser } from '../user/user.data';

export type Dispensary = {
	_id: ObjectId;
	name: string;
	slug: string;
	domain?: string;
	billingId?: string;
	billingProvider?: string;
	createdAt: Date;
	updatedAt: Date;
};

export type Dispensary = Prisma.OrganizationUncheckedCreateInput & {
	address: AddressPayload;
	schedule: Prisma.ScheduleCreateManyOrganizationInput;
	images: Prisma.ImageOrganizationCreateManyOrganizationInput[];
	products: Prisma.ProductCreateInput[];
	categoryList: Prisma.CategoryListCreateInput;
	siteSetting?: Prisma.SiteSettingCreateInput;
};

export type OrganizationWithAddress = Organization & {
	address: AddressWithCoordinates;
};

export type OrganizationUpdateType = Organization & {
	address: AddressWithCoordinates;
};

export type OrganizationMetadata = {
	metadata?: { productsFetched?: boolean };
};

export type OrganizationWithOrderDetails = Organization &
	Omit<Organization, 'stripeAccountId' | 'createdAt' | 'updatedAt'> & {
		address: AddressWithCoordinates;
	};

export type OrganizationWithShopDetails = Organization &
	Omit<Organization, 'stripeAccountId' | 'createdAt' | 'updatedAt'> & {
		address: AddressWithCoordinates;
		images: ImageOrganization[];
		products: ProductWithShopDetails[];
		categoryList: CategoryList;
		schedule: Schedule[];
		vendor: Vendor;
		siteSetting: SiteSetting;
	};

export type OrganizationWithDashboardDetails = Organization & {
	products: ProductWithDashboardDetails[];
	orders: Order[];
	address: AddressWithCoordinates;
	memberships: MembershipWithUser[];
	images: ImageOrganization[];
	categoryList: CategoryList;
	categories?: Category[];
	siteSetting: SiteSetting;
	subscriptionPlan: SubscriptionPlan;
	schedule: Schedule[];
	subdomain: SubDomain;
	vendor: Vendor;
};

export type UserLocation = {
	userLocation: Coordinates;
	proximityRadius: number;
};
