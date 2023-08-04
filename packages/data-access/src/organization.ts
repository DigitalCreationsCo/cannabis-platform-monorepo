import { createId } from '@paralleldrive/cuid2';
import {
	type CategoryList,
	type Coordinates,
	type ImageOrganization,
	type Organization,
	type Prisma,
	type Schedule,
	type SubDomain,
	type Vendor,
} from '@prisma/client';
import { type AddressCreateType, type AddressWithCoordinates } from './address';
import prisma from './db/prisma';
import { type ProductWithShopDetails } from './product';
/*
 *   updateOrganization
 *   createOrganization
 *   deleteOrganizationById
 *   findOrganizationById
 *   findMultipleOrganizationsById
 *   findOrganizationsByZipcode
 *   findUsersByOrganization
 *   findOrganizationBySubdomain
 *   updateStripeAccountDispensary
 *   getStripeAccountId
 */

/**
 * Update existing Organization record
 * @param organization
 * @returns the updated organization
 */
export async function updateOrganization(organization: OrganizationCreateType) {
	try {
		organization.subdomainId =
			organization.subdomainId || organization.name.toLowerCase();

		return await prisma.organization.update({
			where: { id: organization.id },
			data: {
				name: organization.name,
				dialCode: organization.dialCode,
				phone: organization.phone,
				stripeAccountId: organization.stripeAccountId,
				stripeOnboardingComplete: false,
				termsAccepted: false,
				address: {
					update: {
						street1: organization.address.street1,
						street2: organization.address.street2,
						city: organization.address.city,
						state: organization.address.state,
						country: organization.address.country,
						zipcode: organization.address.zipcode,
						countryCode: organization.address.countryCode,
						coordinates: {
							upsert: {
								update: {
									latitude: Number(organization.address.coordinates?.latitude),
									longitude: Number(
										organization.address.coordinates?.longitude,
									),
								},
								create: {
									latitude: Number(organization.address.coordinates?.latitude),
									longitude: Number(
										organization.address.coordinates?.longitude,
									),
								},
							},
						},
					},
				},
				subdomain: {
					connectOrCreate: {
						where: { id: organization.subdomainId },
						create: { id: organization.subdomainId, isValid: true },
					},
				},
				vendor: {
					connectOrCreate: {
						where: { id: organization.vendorId },
						create: {
							id: organization.vendorId,
							name: organization.name,
							publicName: organization.name,
						},
					},
				},
			},
			include: {
				address: {
					include: {
						coordinates: true,
					},
				},
				subdomain: true,
				vendor: true,
			},
		});
	} catch (error: any) {
		console.error('updateOrganization error: ', error);
		throw new Error(error.message);
	}
}

export async function createOrganization(organization: OrganizationCreateType) {
	try {
		organization.vendorId = organization.vendorId ?? createId();

		organization.subdomainId = organization.name
			.toLowerCase()
			.split(' ')
			.join('-');

		const { address, subdomainId, schedule } = organization;

		console.info('creating organization');
		return await prisma.organization.create({
			data: {
				name: organization.name,
				dialCode: organization.dialCode,
				phone: organization.phone,
				stripeAccountId: organization.stripeAccountId,
				stripeOnboardingComplete: false,
				termsAccepted: false,
				address: {
					create: {
						street1: address.street1,
						street2: address.street2,
						city: address.city,
						state: address.state,
						country: address.country,
						zipcode: address.zipcode,
						coordinates: {
							create: {
								latitude: Number(address.coordinates?.latitude),
								longitude: Number(address.coordinates?.longitude),
							},
						},
					},
				},
				images:
					organization.images?.length > 0
						? {
								create: {
									location: organization.images?.[0]?.location,
								},
						  }
						: undefined,
				schedule: {
					create: {
						createdAt: schedule.createdAt,
						days: schedule.days,
						openAt: schedule.openAt,
						closeAt: schedule.closeAt,
					},
				},
				subdomain: {
					connectOrCreate: {
						where: { id: organization.subdomainId },
						create: { id: subdomainId, isValid: true },
					},
				},
				vendor: {
					connectOrCreate: {
						// where: { name: vendorName },
						where: { id: organization.vendorId },
						create: {
							id: organization.vendorId,
							publicName: organization.name,
							name: organization.name,
						},
					},
				},
				siteSetting: {
					create: {
						title: '',
						description: '',
						bannerText: '',
					},
				},
				// add default site settings
			},
		});
	} catch (error: any) {
		console.error('createOrganization error: ', error.message);
		console.log('code: ', error.code);
		throw new Error(error.message);
	}
}

/**
 * Delete existing Organization record
 * @param organizationId {string}
 * @returns the deleted organization
 */
export async function deleteOrganizationById(id: string) {
	try {
		return await prisma.organization.delete({
			where: { id },
		});
	} catch (error: any) {
		console.error('delete organization error: ', error);
		throw new Error(error.message);
	}
}

/**
 * get Organization record by id
 * @param organizationId
 * @returns
 */
export async function findOrganizationById(organizationId: string) {
	try {
		const organization = await prisma.organization.findUnique({
			where: { id: organizationId },
			include: {
				address: {
					include: {
						coordinates: true,
					},
				},
				images: true,
				vendor: true,
			},
		});
		return organization || null;
	} catch (error: any) {
		console.error(error);
		throw new Error(error);
	}
}

/**
 * get Users for an Organization using the organizationId
 * @param organizationId
 * @returns details of users for the organization
 */
export async function findUsersByOrganization(organizationId: string) {
	try {
		return (
			(await prisma.user.findMany({
				orderBy: {
					id: 'desc',
				},
				where: {
					memberships: {
						some: {
							organizationId,
						},
					},
				},
				include: {
					memberships: {
						orderBy: {
							role: 'asc',
						},
					},
					profilePicture: true,
				},
			})) || []
		);
	} catch (error: any) {
		console.error(error);
		throw new Error(error);
	}
}

/**
 * get Organization record using subdomain id
 * @param subdomainId
 * @returns detailed organization record
 */
export async function findOrganizationBySubdomain(
	subdomainId: string,
): Promise<OrganizationWithShopDetails> {
	try {
		const organization =
			(await prisma.subDomain.findUnique({
				where: {
					id: subdomainId,
				},
				include: {
					organization: {
						include: {
							address: {
								include: {
									coordinates: true,
								},
							},
							images: true,
							products: true,
							siteSetting: true,
							categoryList: true,
							schedule: true,
							subdomain: true,
						},
					},
				},
			})) || {};
		return organization as unknown as OrganizationWithShopDetails;
	} catch (error: any) {
		console.error(error);
		throw new Error(error);
	}
}

/**
 * get zero or more Organization records using an array
 * @param organizationIds
 * @returns an array of detailed Organization records
 */
export async function findMultipleOrganizationsById(
	organizationIds: string[],
): Promise<OrganizationWithShopDetails[]> {
	try {
		const localOrganizations = await prisma.organization.findMany({
			where: {
				id: { in: organizationIds },
			},
			include: {
				address: {
					include: {
						coordinates: true,
					},
				},
				images: true,
				products: true,
				siteSetting: true,
				categoryList: true,
				schedule: true,
				subdomain: true,
			},
		});
		return localOrganizations as unknown as OrganizationWithShopDetails[];
	} catch (error: any) {
		console.error(error);
		throw new Error(error);
	}
}

/**
 * get zero or more Organization records using a zipcode
 * @param zipcode area zipcode
 * @param limit number of records to return
 * @returns an array of detailed Organization records
 */
export async function findOrganizationsByZipcode(
	zipcode: number,
	limit: number,
	radius: number,
): Promise<OrganizationWithShopDetails[]> {
	try {
		const organizations =
			(await prisma.organization.findMany({
				include: {
					address: {
						include: {
							coordinates: true,
						},
					},
					images: true,
					products: true,
					siteSetting: true,
					categoryList: true,
					schedule: true,
					subdomain: true,
				},
				where: {
					address: {
						is: {
							zipcode: {
								gte: zipcode - radius,
								lte: zipcode + radius,
							},
						},
					},
				},
				take: Number(limit),
			})) || [];
		return organizations as unknown as OrganizationWithShopDetails[];
	} catch (error: any) {
		console.error(error);
		throw new Error(error);
	}
}

/**
 * Adds stripe account id to organization record
 * @param id organization id
 * @param stripeAccountId stripe account id
 * @param accountParams additional params to update
 */
export async function updateStripeAccountDispensary(
	id: string,
	stripeAccountId: string,
	accountParams = {},
) {
	try {
		return await prisma.organization.update({
			where: { id },
			data: { stripeAccountId, ...accountParams },
		});
	} catch (error: any) {
		console.error(error);
		throw new Error(error);
	}
}

/**
 * get the stripe account id for an organization using the organization id
 * @param organizationId
 * @returns stripeAccountId
 */
export async function getStripeAccountId(organizationId: string) {
	try {
		const accountId = await prisma.organization.findUnique({
			where: { id: organizationId },
			select: { stripeAccountId: true },
		});
		return accountId?.stripeAccountId;
	} catch (error: any) {
		console.error(error);
		throw new Error(error);
	}
}

// export type OrganizationCreateType = Prisma.PromiseReturnType<typeof createOrganization>
// export type OrganizationC = Prisma.OrganizationCreateArgs["data"]

export type OrganizationCreateType = Organization & {
	address: AddressCreateType;
	schedule: Prisma.ScheduleCreateInput;
	images: Prisma.ImageOrganizationCreateManyOrganizationInput[];
	products: Prisma.ProductCreateInput[];
	categoryList: Prisma.CategoryListCreateInput;
};

export type OrganizationWithAddress = Organization & {
	address: AddressWithCoordinates;
};

export type OrganizationWithShopDetails = Organization &
	Omit<Organization, 'stripeAccountId' | 'createdAt' | 'updatedAt'> & {
		address: AddressWithCoordinates;
		images: ImageOrganization[];
		products: ProductWithShopDetails[];
		categoryList: CategoryList;
		schedule: Schedule;
		vendor: Vendor;
	};

export type OrganizationWithDashboardDetails = Organization & {
	address: AddressWithCoordinates;
	images: ImageOrganization[];
	schedule: Schedule;
	vendor: Vendor;
	subdomain: SubDomain;
};

export type OrganizationStripeDetail = {
	id: string;
	stripeAccountId: string;
};

export type OrganizationStripePayload = {
	organization: OrganizationCreateType;
	stripeAccountId: string;
};

export type UserLocation = {
	userLocation: Coordinates;
	proximityRadius: number;
};
