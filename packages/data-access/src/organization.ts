import { Address, CategoryList, Coordinates, ImageOrganization, Prisma, Schedule } from "@prisma/client";
import prisma from "./db/prisma";

/*
*   createOrganization
*   findOrganizationById
*   findMultipleOrganizationsById
*   findUsersByOrganization
*   findOrganizationBySubdomain
*   updateOrganization
*   updateStripeAccountDispensary
*   getStripeAccountId
*/

/**
 * Create new Organization record
 * @param organization 
 * @returns the created organization
 */
export async function createOrganization(organization: OrganizationCreateType) { 
    try {
        organization.subdomainId = organization.name.toLowerCase();
        const { vendorId, address, subdomainId, ...data } = organization
        const { coordinates, userId, ...addressData } = address

        const { latitude, longitude } = coordinates
        console.log('coordinates here', coordinates)
        const createOrganization = await prisma.organization.create({
            data: {
                ...data,
                address: {
                    create: {
                        ...addressData,
                        coordinates: {
                            create: {
                                latitude: Number(latitude),
                                longitude: Number(longitude)
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
        const organization = await prisma.organization.findUnique({ where: { id: organizationId } }) || {}
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
    address: Address & { coordinates: Coordinates }
    dialCode: string
    phone: string
    email: string
    emailVerified?: boolean
    vendorId: string
    termsAccepted?: boolean
    coordinates?: Coordinates
    subdomainId: string
}

export type OrganizationWithShopDetails = {
    id: string
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

export type UserLocation = {
    userLocation: Coordinates;
    proximityRadius: number;
}