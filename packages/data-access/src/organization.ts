import { Address, CategoryList, Coordinates, ImageOrganization, Schedule } from "@prisma/client";
import prisma from "./db/prisma";

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
        // const createOrganization = await prisma.$transaction(
        //     [
        //       prisma.resource.deleteMany({ where: { name: 'name' } }),
        //       prisma.resource.createMany({ data }),
        //     ],
        //   )
        return createOrganization
    } catch (error: any) {
        console.error('ERROR: ', error.message)
        if (error.code === 'P2002') {
            throw new Error('error creating organization, unique key exists')
        }
        else throw new Error('error creating organization')
    }
}
export async function findOrganizationById(organizationId:string) {
    try {
        const organization = await prisma.organization.findUnique({ where: { id: organizationId } }) || {}
        return organization
    } catch (error: any) {
        console.error(error)
        throw new Error(error)
    }
}

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

export async function findOrganizationBySubdomain(subdomainId:string) {
    try {
        const organization = await prisma.subDomain.findUnique({ where: { id: subdomainId }, include: {organization: {include: {address: true, images: true, products: true, siteSetting: true, categoryList: true}}} }) || {}
        return organization
    } catch (error: any) {
        console.error(error)
        throw new Error(error)
    }
}

export async function findLocalOrganizations(organizationIds: string[]) {
    try {
        const localOrganizations = await prisma.organization.findMany({ where: { id: { in: organizationIds } }, include: { address: true, images: true, products: true, siteSetting: true, categoryList: true }}) || []
        return localOrganizations
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

export type ServeUserProximity = {
    userLocation: Coordinates;
    proximityRadius: number;
}