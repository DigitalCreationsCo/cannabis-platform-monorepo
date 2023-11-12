import {
	type Category,
	type CategoryList,
	type Coordinates,
	type ImageOrganization,
	type Membership,
	type Order,
	type Organization,
	type Prisma,
	type Schedule,
	type SiteSetting,
	type SubDomain,
	type User,
	type Vendor,
} from '@prisma/client';
import {
	type AddressPayload,
	type AddressWithCoordinates,
} from './address.types';
import {
	type ProductWithDashboardDetails,
	type ProductWithShopDetails,
} from './product.data';

export type OrganizationCreateType = Prisma.OrganizationUncheckedCreateInput & {
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
	schedule: Schedule[];
	subdomain: SubDomain;
	vendor: Vendor;
};

export type UserLocation = {
	userLocation: Coordinates;
	proximityRadius: number;
};

export type MembershipWithUser = Membership & {
	user: User;
};
