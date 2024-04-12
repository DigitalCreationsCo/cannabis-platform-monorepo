/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createId } from '@paralleldrive/cuid2';
import { type Prisma } from '@prisma/client';
import clientPromise, { collections, db_namespace } from './db/mongo';
import prisma from './db/prisma';
import {
	type OrganizationWithAddress,
	type OrganizationCreateType,
	type OrganizationWithShopDetails,
} from './organization.types';
/*
 *   updateOrganization
 *   createOrganization
 *   deleteOrganizationById
 *   findOrganizationById
 *   findMultipleOrganizationsById
 *   findOrganizationsByZipcode
 *   findUsersByOrganization
 *   findOrganizationBySubdomain
 *   updateDispensaryStripeAccount
 *   getStripeAccountId
 */

/**
 * Update existing Organization record
 * @param organization
 */
export async function updateOrganization(
	// organization: OrganizationUpdateType,
	organization: any,
) {
	try {
		const client = await clientPromise;
		return await client
			.db(db_namespace.location)
			.collection(collections.dispensaries)
			.updateOne(
				{ id: organization.id },
				{
					$set: {
						...organization,
						address: {
							...organization.address,
							coordinates: [
								Number(organization.address.coordinates.longitude),
								Number(organization.address.coordinates.latitude),
							],
						},
					},
				},
			);

		// prisma.organization.update({
		// 	where: { id: organization.id },
		// 	data: {
		// 		name: organization.name,
		// 		dialCode: organization.dialCode || '1',
		// 		phone: organization.phone,
		// 		stripeAccountId: organization.stripeAccountId,
		// 		stripeOnboardingComplete: organization.stripeOnboardingComplete,
		// 		termsAccepted: organization.termsAccepted,
		// 		// address: {
		// 		// 	update: {
		// 		// 		street1: organization?.address?.street1,
		// 		// 		street2: organization?.address?.street2,
		// 		// 		city: organization?.address?.city,
		// 		// 		state: organization?.address?.state,
		// 		// 		country: organization?.address?.country,
		// 		// 		zipcode: Number(organization?.address?.zipcode),
		// 		// 		countryCode: organization?.address?.countryCode,
		// 		// 		coordinates: {
		// 		// 			upsert: {
		// 		// 				create: {
		// 		// 					radius: organization?.address?.coordinates?.radius,
		// 		// 					latitude: Number(
		// 		// 						organization?.address?.coordinates?.latitude,
		// 		// 					),
		// 		// 					longitude: Number(
		// 		// 						organization?.address?.coordinates?.longitude,
		// 		// 					),
		// 		// 				},
		// 		// 				update: {
		// 		// 					radius: organization?.address?.coordinates?.radius,
		// 		// 					latitude: Number(
		// 		// 						organization?.address?.coordinates?.latitude,
		// 		// 					),
		// 		// 					longitude: Number(
		// 		// 						organization?.address?.coordinates?.longitude,
		// 		// 					),
		// 		// 				},
		// 		// 			},
		// 		// 		},
		// 		// 	},
		// 		// },
		// 		subdomain: {
		// 			connectOrCreate: {
		// 				where: { id: organization.subdomainId },
		// 				create: { id: organization.subdomainId, isValid: true },
		// 			},
		// 		},
		// 		vendor: organization.vendorName
		// 			? {
		// 					connectOrCreate: {
		// 						where: { name: organization.vendorName },
		// 						create: {
		// 							name: organization.vendorName,
		// 							publicName: organization.vendorName,
		// 						},
		// 					},
		// 			  }
		// 			: undefined,
		// 	},
		// 	include: {
		// 		address: {
		// 			include: {
		// 				coordinates: true,
		// 			},
		// 		},
		// 		subdomain: true,
		// 		vendor: true,
		// 	},
		// });
	} catch (error: any) {
		console.log('data-access updateOrganization error code: ', error);
		throw new Error(error.message);
	}
}

export async function createOrganization(organization: OrganizationCreateType) {
	try {
		organization.subdomainId = makeUrlFriendly(organization.name);
		organization.vendorName = organization.vendorName ?? '';
		organization.subscriptionPlanId = organization.subscriptionPlanId ?? '';

		const { address } = organization;

		const client = await clientPromise;
		return await client
			.db(db_namespace.location)
			.collection(collections.dispensaries)
			.insertOne({
				...organization,
				id: organization.id || createId(),
				address: {
					...address,
					coordinates: [
						Number(address.coordinates!.longitude),
						Number(address.coordinates!.latitude),
					],
				},
			});

		// return (await prisma.organization.create({
		// 	data: {
		// 		id: organization.id || undefined,
		// 		name: organization.name,
		// 		dialCode: organization.dialCode,
		// 		phone: organization.phone,
		// 		stripeAccountId: organization.stripeAccountId,
		// 		ecommerceUrl: organization.ecommerceUrl,
		// 		stripeOnboardingComplete: false,
		// 		termsAccepted: organization.termsAccepted || false,
		// 		address: {
		// 			create: {
		// 				street1: address.street1,
		// 				street2: address.street2,
		// 				city: address.city,
		// 				state: address.state,
		// 				country: address.country,
		// 				zipcode: address.zipcode,
		// 				coordinates: {
		// 					create: {
		// 						latitude: Number(address.coordinates?.latitude),
		// 						longitude: Number(address.coordinates?.longitude),
		// 					},
		// 				},
		// 			},
		// 		},
		// 		images:
		// 			organization.images?.length > 0
		// 				? {
		// 						createMany: {
		// 							data: organization.images.map(
		// 								(image: OrganizationCreateType['images'][number]) => ({
		// 									location: image.location,
		// 									blurhash: image.blurhash || '',
		// 									alt: image.alt || '',
		// 								}),
		// 							),
		// 						},
		// 				  }
		// 				: undefined,
		// 		schedule: schedule
		// 			? {
		// 					create: {
		// 						days: schedule.days,
		// 						openAt: schedule.openAt,
		// 						closeAt: schedule.closeAt,
		// 					},
		// 			  }
		// 			: undefined,
		// 		subdomain: {
		// 			connectOrCreate: {
		// 				where: { id: organization.subdomainId },
		// 				create: { id: subdomainId, isValid: true },
		// 			},
		// 		},
		// 		vendor: organization.vendorName
		// 			? {
		// 					connectOrCreate: {
		// 						where: { name: organization.vendorName },
		// 						create: {
		// 							publicName: organization.vendorName,
		// 							name: organization.vendorName,
		// 						},
		// 					},
		// 			  }
		// 			: undefined,
		// 		siteSetting: {
		// 			create: {
		// 				// default site settings
		// 				title: organization.siteSetting?.title || '',
		// 				description: organization.siteSetting?.description || '',
		// 				bannerText: organization.siteSetting?.bannerText || '',
		// 				primaryColor: organization.siteSetting?.primaryColor || '#14a33d',
		// 				secondaryColor:
		// 					organization.siteSetting?.secondaryColor || '#13622a',
		// 				tertiaryColor: organization.siteSetting?.tertiaryColor || '#ffffff',
		// 				textColor: organization.siteSetting?.textColor || '#3e3a3a',
		// 				backgroundColor:
		// 					organization.siteSetting?.backgroundColor || '#ffffff',
		// 			},
		// 		},
		// 	},
		// 	include: {
		// 		address: {
		// 			include: {
		// 				coordinates: true,
		// 			},
		// 		},
		// 		subdomain: true,
		// 		vendor: true,
		// 	},
		// })) as OrganizationWithAddress;
	} catch (error: any) {
		console.log('data-access createOrganization error: ', error);
		if (error.code === 'P2002')
			throw new Error(`Unique value ${error.meta.target[0]} already exists`);
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
		const client = await clientPromise;
		return await client
			.db(db_namespace.location)
			.collection(collections.dispensaries)
			.deleteOne({ id });
	} catch (error: any) {
		console.error('delete organization error: ', error);
		throw new Error(error.message);
	}
}

/**
 * get Organization record by id
 * @param organizationId
 * @param include
 */
export async function findOrganizationById(
	organizationId: string,
	// include: Prisma.OrganizationInclude = {
	// 	address: {
	// 		include: { coordinates: true },
	// 	},
	// 	images: true,
	// 	siteSetting: true,
	// 	schedule: true,
	// 	subdomain: true,
	// 	vendor: true,
	// },
) {
	try {
		const client = await clientPromise;
		return await client
			.db(db_namespace.location)
			.collection(collections.dispensaries)
			.findOne({
				id: organizationId,
			});
		// return (await prisma.organization.findUnique({
		// 	where: { id: organizationId },
		// 	include: {
		// 		...include,
		// 		address: {
		// 			include: { coordinates: true },
		// 		},
		// 		images: true,
		// 		siteSetting: true,
		// 		schedule: true,
		// 		subdomain: true,
		// 	},
		// })) as unknown as OrganizationWithShopDetails;
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
		const client = await clientPromise;
		return await client
			.db(db_namespace.location)
			.collection(collections.users)
			.find({
				'memberships.organizationId': organizationId,
			});

		// return (
		// 	(await prisma.user.findMany({
		// 		orderBy: {
		// 			id: 'desc',
		// 		},
		// 		where: {
		// 			memberships: {
		// 				some: {
		// 					organizationId,
		// 				},
		// 			},
		// 		},
		// 		include: {
		// 			memberships: {
		// 				orderBy: {
		// 					role: 'asc',
		// 				},
		// 			},
		// 			profilePicture: true,
		// 		},
		// 	})) || []
		// );
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
export async function findOrganizationBySubdomain(subdomainId: string) {
	try {
		const client = await clientPromise;
		return await client
			.db(db_namespace.location)
			.collection(collections.dispensaries)
			.findOne({
				'subdomain.id': subdomainId,
			});
		// const organization =
		// 	(await prisma.subDomain.findUnique({
		// 		where: {
		// 			id: subdomainId,
		// 		},
		// 		include: {
		// 			organization: {
		// 				include: {
		// 					address: {
		// 						include: {
		// 							coordinates: true,
		// 						},
		// 					},
		// 					images: true,
		// 					products: {
		// 						include: {
		// 							variants: true,
		// 							reviews: true,
		// 							categories: true,
		// 						},
		// 					},
		// 					siteSetting: true,
		// 					categoryList: true,
		// 					schedule: true,
		// 					subdomain: true,
		// 				},
		// 			},
		// 		},
		// 	})) || {};
		// return organization as unknown as OrganizationWithShopDetails;
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
export async function findMultipleOrganizationsById(organizationIds: string[]) {
	try {
		const client = await clientPromise;
		return await client
			.db(db_namespace.location)
			.collection(collections.dispensaries)
			.find({
				id: { $in: organizationIds },
			});

		// const localOrganizations = await prisma.organization.findMany({
		// 	where: {
		// 		id: { in: organizationIds },
		// 	},
		// 	include: {
		// 		address: {
		// 			include: {
		// 				coordinates: true,
		// 			},
		// 		},
		// 		images: true,
		// 		products: {
		// 			include: {
		// 				variants: true,
		// 				reviews: true,
		// 				categories: true,
		// 			},
		// 		},
		// 		siteSetting: true,
		// 		categoryList: true,
		// 		schedule: true,
		// 		subdomain: true,
		// 	},
		// });
		// return localOrganizations as unknown as OrganizationWithShopDetails[];
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
				include: {
					address: {
						include: {
							coordinates: true,
						},
					},
					images: true,
					// products: {
					// 	include: {
					// 		variants: true,
					// 		reviews: true,
					// 		categories: true,
					// 	},
					// },
					siteSetting: true,
					// categoryList: true,
					schedule: true,
					subdomain: true,
				},
				take: Number(limit),
				orderBy: [{ address: { zipcode: 'asc' } }],
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
export async function updateDispensaryStripeAccount(
	id: string,
	stripeAccountId: string,
	accountParams: Prisma.OrganizationUncheckedUpdateInput = {},
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

/**
 * Return a url-friendly string
 * @param input string
 * @returns a lowercased string with all non-url-friendly characters removed, and spaces replaced with dashes
 */
export function makeUrlFriendly(input: string) {
	const replaceNonUrlFriendly = /[^\w\-.~ ]/g;
	const urlFriendlyString = input.replace(replaceNonUrlFriendly, '');
	return urlFriendlyString.replace(/ /g, '-').toLowerCase();
	// 	const replaceNonUrlFriendly = /[^\w\-.~]/g;
	// 	return input.replace(replaceNonUrlFriendly, '');
	// }
}
