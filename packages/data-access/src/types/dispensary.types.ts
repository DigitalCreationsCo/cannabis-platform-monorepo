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
// import {
// 	type AddressPayload,
// 	type AddressWithCoordinates,
// } from '../address.types';
// import {
// 	type ProductWithDashboardDetails,
// 	type ProductWithShopDetails,
// } from '../product/product.data';
// import { type MembershipWithUser } from '../user/user.data';

import { type Address } from './address.types';

export type POS = 'dutchie' | 'blaze' | 'weedmaps';
export type Inventory = 'metrc' | 'biotrack';
export interface SiteSetting {
	// theme: string;
	// accentFont: string;
	primaryColor: string;
	secondaryColor: string;
	tertiaryColor: string;
	textColor: string;
	backgroundColor: string;
	showTitle: boolean;
	showBanner: boolean;
	showDescription: boolean;
	title: string;
	description: string;
	bannerText: string;
}
export interface Dispensary {
	id: string;
	name: string;
	slug: string;
	domain?: string;
	billingId?: string;
	subscriptionPlanId?: string;
	address?: Address;
	dialCode?: string;
	phone?: string;
	schedule?: Schedule[];
	ecommerceUrl?: string;
	timeZone?: string;
	isSubscribedForDelivery?: boolean;
	isSubscribedForPickup?: boolean;
	isSubscribedForMessaging?: boolean;
	termsAccepted?: boolean;
	billingProvider?: string;
	stripeAccountId?: string;
	stripeOnboardingComplete?: boolean;
	siteSetting?: SiteSetting;
	images?: { location: string; blurhash: string; alt: string }[];
	pos?: POS;
	isSignupComplete?: boolean;

	weedTextPhoneNumber?: string;
	weedTextSegmentId?: string;

	members?: string[];
	createdAt?: Date;
	updatedAt?: Date;
	showInMarketPlace?: boolean;
}

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

export interface Schedule {
	day: string;
	openAt: number | string | any;
	closeAt: number | string | any;
}

export type Invitation = any;
