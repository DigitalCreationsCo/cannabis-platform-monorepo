import { Address, Coordinates } from "@prisma/client";
import prisma from "./db/prisma";

export async function createOrganization(organization: any, address: any) { 
    try {
        const { vendorId, subdomainId, ...organizationCreate } = organization
        const createOrganization = await prisma.organization.create({
            data: {
                ...organizationCreate,
                address: {
                    create: address
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
            }
        });
        return createOrganization
    } catch (error: any) {
        console.error(error)
        throw new Error('error creating organization, unique key exists')
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
    name: string
    address: Address
    dialCode: string
    phone: string
    email: string
    emailVerified?: boolean
    vendorId: string
    termsAccepted?: boolean
    subdomainId: string
}

export type ServeUserProximity = {
    userLocation: Coordinates;
    proximityRadius: number;
}