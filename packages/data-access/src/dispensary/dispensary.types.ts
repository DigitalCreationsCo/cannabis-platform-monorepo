// import {
// 	type SubscriptionPlan,
// 	type Category,
// 	type CategoryList,
// 	type Coordinates,
// 	type ImageOrganization,
// 	type Order,
// 	type Organization,
// 	type Prisma,
// 	type Schedule,
// 	type SiteSetting,
// 	type SubDomain,
// 	type Vendor,
// } from '@prisma/client';
// import {
// 	type AddressPayload,
// 	type AddressWithCoordinates,
// } from '../address.types';
// import {
// 	type ProductWithDashboardDetails,
// 	type ProductWithShopDetails,
// } from '../product/product.data';
// import { type MembershipWithUser } from '../user/user.data';

import { type Address } from '../address.types';

export type POS = 'dutchie' | 'blaze' | 'weedmaps';
export type Inventory = 'metrc' | 'biotrack';
export type SiteSetting = {
	theme: string;
	primaryColor: string;
	secondaryColor: string;
	tertiaryColor: string;
	textColor: string;
	backgroundColor: string;
	accentFont: string;
	description: string;
	bannerText: string;
};
export type Dispensary = {
	id: string;
	name: string;
	slug: string;
	domain?: string;
	billingId?: string;
	address?: Address;
	schedule?: Schedule[];
	ecommerceUrl?: string;
	isSubscribedForDelivery?: boolean;
	isSubscribedForPickup?: boolean;
	isSubscribedForMessaging?: boolean;
	billingProvider?: string;
	stripeAccountId?: string;
	siteSetting?: SiteSetting;
	images?: { location: string; blurhash: string }[];
	pos?: POS;
	isSignupComplete?: boolean;
	slickTextTextwordId?: string;
	slickTextSegmentId?: string;
	members?: string[];
	createdAt?: Date;
	updatedAt?: Date;
};

//  export type Dispensary = Prisma.OrganizationUncheckedCreateInput & {
// 	address: AddressPayload;
// 	schedule: Prisma.ScheduleCreateManyOrganizationInput;
// 	images: Prisma.ImageOrganizationCreateManyOrganizationInput[];
// 	products: Prisma.ProductCreateInput[];
// 	categoryList: Prisma.CategoryListCreateInput;
// 	siteSetting?: Prisma.SiteSettingCreateInput;
//  };

//  export type OrganizationWithAddress = Organization & {
// 	address: AddressWithCoordinates;
//  };

//  export type OrganizationUpdateType = Organization & {
// 	address: AddressWithCoordinates;
//  };

//  export type OrganizationMetadata = {
// 	metadata?: { productsFetched?: boolean };
//  };

//  export type OrganizationWithOrderDetails = Organization &
// 	Omit<Organization, 'stripeAccountId' | 'createdAt' | 'updatedAt'> & {
// 		address: AddressWithCoordinates;
// 	};

//  export type OrganizationWithShopDetails = Organization &
// 	Omit<Organization, 'stripeAccountId' | 'createdAt' | 'updatedAt'> & {
// 		address: AddressWithCoordinates;
// 		images: ImageOrganization[];
// 		products: ProductWithShopDetails[];
// 		categoryList: CategoryList;
// 		schedule: Schedule[];
// 		vendor: Vendor;
// 		siteSetting: SiteSetting;
// 	};

//  export type OrganizationWithDashboardDetails = Organization & {
// 	products: ProductWithDashboardDetails[];
// 	orders: Order[];
// 	address: AddressWithCoordinates;
// 	memberships: MembershipWithUser[];
// 	images: ImageOrganization[];
// 	categoryList: CategoryList;
// 	categories?: Category[];
// 	siteSetting: SiteSetting;
// 	subscriptionPlan: SubscriptionPlan;
// 	schedule: Schedule[];
// 	subdomain: SubDomain;
// 	vendor: Vendor;
//  };

//  export type UserLocation = {
// 	userLocation: Coordinates;
// 	proximityRadius: number;
//  };

export type Schedule = {
	day: string;
	openAt: number;
	closeAt: number;
};

export type Invitation = any;
