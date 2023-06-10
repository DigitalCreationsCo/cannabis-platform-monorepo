import { Address, CategoryList, Coordinates, ImageOrganization, Organization, Prisma, Schedule } from "@prisma/client";
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
*   updateOrganization
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
                ...data,
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
        organization.subdomainId = organization.name.toLowerCase();
        
        const { vendorId, address, subdomainId, ...data } 
        = organization

        const { coordinates, coordinateId, userId, ...addressData } 
        = address
        
        const createOrganization = await prisma.organization.create({
            data: {
                ...data,
                address: {
                    create: {
                        ...addressData,
                        coordinates: {
                            create: {
                                latitude: Number(coordinates?.latitude),
                                longitude: Number(coordinates?.longitude)
                            }
                        }
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
export async function findOrganizationBySubdomain(subdomainId:string) {
    try {
        const organization = await prisma.subDomain.findUnique({ where: { id: subdomainId }, include: {organization: {include: {address: true, images: true, products: true, siteSetting: true, categoryList: true}}} }) || {}
        return organization
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
export async function findMultipleOrganizationsById(organizationIds: string[]) {
    try {
        const localOrganizations = await prisma.organization.findMany({ where: { id: { in: organizationIds } }, include: { address: true, images: true, products: true, siteSetting: true, categoryList: true }}) || []
        return localOrganizations
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
export async function findOrganizationsByZipcode(zipcode: number, limit: number) {
    try {
        const organizations = await prisma.organization.findMany({ 
            include: { 
                address: true, 
                images: true, 
                products: true, 
                siteSetting: true, 
                categoryList: true 
            },
            where: {
                address: {
                    isNot: undefined,
                    zipcode: {
                        in: [zipcode - 1000, zipcode, zipcode + 1000]
                    }
                }
            },
            take: Number(limit),
            
        }) || [];
        return organizations;
    } catch (error: any) {
        console.error(error)
        throw new Error(error)
    }
}

/**
 * update Organization Record
 * @param id organization id
 * @param data fields to update
 * @returns 
 */
export async function updateOrganizationRecord(id: string, data: Prisma.OrganizationUpdateArgs['data']) {
    try {
        const update = await prisma.organization.update({ where: { id }, data: {...data }})
        return update
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

export type OrganizationCreateType = {
    id: string | undefined
    name: string
    address: AddressCreateType
    dialCode: string
    phone: string
    email: string
    emailVerified?: boolean
    vendorId: string
    termsAccepted?: boolean
    subdomainId: string
}

export type OrganizationWithAddress = Organization & { address: AddressWithCoordinates}

export type OrganizationWithShopDetails = {
    id: string
    stripeAccountId: string
    name: string
    address: Address & { coordinates: Coordinates }
    dialCode: string
    phone: string
    email: string
    emailVerified?: boolean
    vendorId: string
    termsAccepted?: boolean
    subdomainId: string
    images: ImageOrganization[]
    categoryList: CategoryList[]
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