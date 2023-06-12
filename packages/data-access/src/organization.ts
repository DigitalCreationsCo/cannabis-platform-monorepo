import { CategoryList, Coordinates, ImageOrganization, Organization, Prisma, Schedule } from "@prisma/client";
import { ProductWithDetails } from "product";
import { AddressCreateType, AddressWithCoordinates } from "./address";
import prisma from "./db/prisma";
/*
*   updateOrganization
*   createOrganization
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
        organization.subdomainId = organization.subdomainId || organization.name.toLowerCase();
        
        const { vendorId, address, subdomainId, ...data } 
        = organization
        
        const { coordinates, coordinateId, userId, ...addressData } 
        = address

        const updateOrganization = await prisma.organization.update({
            where: { id: organization.id },
            // create: {
            //     ...data,
            //     address: {
            //         connectOrCreate: {
            //             where: { id: address.id },
            //             create: {
            //                 ...addressData,
            //                 coordinates: {
            //                     connectOrCreate: {
            //                         where: { 
            //                             id: coordinates.id,
            //                             addressId: address.id
            //                         },
            //                         create: { latitude: Number(latitude), longitude: Number(longitude) }
            //                     }
            //                 }
            //             }
            //         }
            //     },
            //     subdomain: {
            //         connectOrCreate: { 
            //             where: { id: organization.subdomainId },
            //             create: { id: subdomainId, isValid: true }
            //         }
            //     },
            //     vendor:{
            //         connectOrCreate: {
            //             where: { id: vendorId },
            //             create: { id: vendorId, name: organization.name, publicName: organization.name }
            //         }
            //     },
            // },
            data: {
                name: organization.name,
                dialCode: organization.dialCode,
                phone: organization.phone,
                stripeAccountId: organization.stripeAccountId,
                stripeOnboardingComplete: false,
                termsAccepted: false,
                address: {
                    connectOrCreate: {
                        where: { id: address.id },
                        create: {
                            ...addressData,
                            // coordinateId: coordinates?.id,
                            // coordinates: coordinates?.id ? ({
                            //     connectOrCreate: {
                            //         where: {
                            //             id: coordinates?.id,
                            //         },
                            //         create: {
                            //             id: coordinates?.id,
                            //             latitude: Number(coordinates?.latitude),
                            //             longitude: Number(coordinates?.longitude),
                            //         }
                            //     }
                            // }) : ({
                                coordinates: {
                                connectOrCreate: {
                                    where: { id: coordinates?.id },
                                    create: {
                                        latitude: Number(coordinates?.latitude),
                                        longitude: Number(coordinates?.longitude),
                                    }
                                }
                            }
                            // })
                        },
                    }
                },
                subdomain: {
                    connectOrCreate: { 
                        where: { id: organization.subdomainId },
                        create: { id: subdomainId, isValid: true }
                    }
                },
                vendor:{
                    connectOrCreate: {
                        where: { id: vendorId },
                        create: { id: vendorId, name: organization.name, publicName: organization.name }
                    }
                },
            },
            include: {
                address: true,
                subdomain: true,
                vendor: true,
            }
        });
        return updateOrganization
    } catch (error: any) {
        console.error('ERROR: ', error)
        if (error.code === 'P2002') {
            throw new Error('error updating organization, there was a unique key conflict.')
        }
        else throw new Error('error updating organization')
    }
}

export async function createOrganization(organization: OrganizationCreateType) { 
    try {
        organization.subdomainId = organization.name.toLowerCase().split(' ').join('-');
        
        const { vendorId, address, subdomainId, schedule } 
        = organization

        // const
        // insertImages = organization.images.map((image) => ({ ...image }));

        const createOrganization = await prisma.organization.create({
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
                                longitude: Number(address.coordinates?.longitude)
                            }
                        }
                    }
                },
                images: {
                    create: {
                        location: organization.images[0].location
                    }
                },
                schedule:{
                    create: {
                        createdAt: schedule.createdAt,
                        days: schedule.days,
                        openAt: schedule.openAt,
                        closeAt: schedule.closeAt,
                    }
                },
                subdomain: {
                    connectOrCreate: { 
                        where: { id: organization.subdomainId },
                        create: { id: subdomainId, isValid: true }
                    }
                },
                vendor:{
                    connectOrCreate: {
                        where: { id: vendorId },
                        create: { id: vendorId, name: organization.name, publicName: organization.name }
                    }
                },
                siteSetting: {
                    create: {
                        title: '',
                        description: '',
                        bannerText: '',
                    }
                }
                // add default site settings
            }
        });
        return createOrganization
    } catch (error: any) {
        console.error('ERROR: ', error.message)
        if (error.code === 'P2002') {
            throw new Error('error creating organization, unique key exists')
        }
        else throw new Error('error creating organization')
    }
}

/**
 * get Organization record by id
 * @param organizationId 
 * @returns 
 */
export async function findOrganizationById(organizationId:string) {
    try {
        const organization = await prisma.organization.findUnique({ 
            where: { id: organizationId },
            include: {
                address: true,
                vendor: true,
            }
         }) || null
        return organization
    } catch (error: any) {
        console.error(error)
        throw new Error(error)
    }
}

/** 
 * get Users for an Organization using the organizationId
 * @param organizationId
 * @returns details of users for the organization
*/
export async function findUsersByOrganization(organizationId:string) {
    try {
        const users = await prisma.user.findMany({
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
                imageUser: true,
            },
        }) || [];
        return users
    } catch (error: any) {
        console.error(error)
        throw new Error(error)
    }
}

/**
 * get Organization record using subdomain id
 * @param subdomainId 
 * @returns detailed organization record
 */
export async function findOrganizationBySubdomain(subdomainId:string): Promise<OrganizationWithShopDetails> {
    try {
        const 
        organization = await prisma.subDomain.findUnique({ 
            where: { 
                id: subdomainId 
            }, 
            include: {
                organization: {
                    include: { 
                        address: {
                            include: {
                                coordinates: true
                            }
                        }, 
                        images: true, 
                        products: true, 
                        siteSetting: true, 
                        categoryList: true,
                        schedule: true,
                        subdomain: true,
                    },
                }
            }
        }) || {};
        return organization as unknown as OrganizationWithShopDetails;
    } catch (error: any) {
        console.error(error)
        throw new Error(error)
    }
}

/**
 * get zero or more Organization records using an array
 * @param organizationIds 
 * @returns an array of detailed Organization records
 */
export async function findMultipleOrganizationsById(organizationIds: string[]): Promise<OrganizationWithShopDetails[]> {
    try {
        
        console.log('organizationIds: ', organizationIds);
        const 
        localOrganizations = await prisma.organization.findMany({
            where: 
                { id: 
                    { in: organizationIds } 
                }, 
                include: { 
                    address: {
                        include: {
                            coordinates: true
                        }
                    }, 
                    images: true, 
                    products: true, 
                    siteSetting: true, 
                    categoryList: true,
                    schedule: true,
                    subdomain: true,
                }})
        return localOrganizations as unknown as OrganizationWithShopDetails[]
    } catch (error: any) {
        console.error(error)
        throw new Error(error)
    }
}

/**
 * get zero or more Organization records using a zipcode
 * @param zipcode area zipcode
 * @param limit number of records to return
 * @returns an array of detailed Organization records
 */
export async function findOrganizationsByZipcode(zipcode: number, limit: number, radius: number): Promise<OrganizationWithShopDetails[]> {
    try {
        const organizations = await prisma.organization.findMany({ 
            include: { 
                address: {
                    include: {
                        coordinates: true
                    }
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
                        }
                    }
                }
            },
            take: Number(limit),
        }) || [];
        return organizations as unknown as OrganizationWithShopDetails[];
    } catch (error: any) {
        console.error(error)
        throw new Error(error)
    }
}

/**
* Adds stripe account id to organization record
* @param id organization id
* @param stripeAccountId stripe account id
* @param accountParams additional params to update
*/
export async function updateStripeAccountDispensary(id: string, stripeAccountId: string, accountParams = {}) {
    try {
        const update = await prisma.organization.update({ where: { id }, data: { stripeAccountId, ...accountParams}})
        return update
    } catch (error: any) {
        console.error(error)
        throw new Error(error)
    }
}

/**
 * get the stripe account id for an organization using the organization id
 * @param organizationId 
 * @returns stripeAccountId
 */
export async function getStripeAccountId(organizationId: string) {
    try {
        const accountId = await prisma.organization.findUnique(
            { 
                where: { id: organizationId },
                select: { stripeAccountId: true }
            })
        return accountId?.stripeAccountId
    } catch (error: any) {
        console.error(error)
        throw new Error(error)
    }
}

// export type OrganizationCreateType = Prisma.PromiseReturnType<typeof createOrganization>
// export type OrganizationC = Prisma.OrganizationCreateArgs["data"]

export type OrganizationCreateType = Organization & {
    address: AddressCreateType
    schedule: Prisma.ScheduleCreateInput
    images: Prisma.ImageOrganizationCreateManyOrganizationInput[]
    products: Prisma.ProductCreateInput[]
    categoryList: Prisma.CategoryListCreateInput
}

export type OrganizationWithAddress = Organization & { address: AddressWithCoordinates}

export type OrganizationWithShopDetails = Organization & Omit<Organization, "stripeAccountId" | "createdAt" | "updatedAt"> & {
    address: AddressWithCoordinates,
    images: ImageOrganization[],
    products: ProductWithDetails[],
    categoryList: CategoryList
    schedule: Schedule
}

export type OrganizationStripeDetail = {
    id: string;
    stripeAccountId: string;
}

export type OrganizationStripePayload = {
    organization: OrganizationCreateType;
    stripeAccountId: string;
}

export type UserLocation = {
    userLocation: Coordinates;
    proximityRadius: number;
}