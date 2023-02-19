import { Address } from "@prisma/client";
import prisma from "./db/prisma";

export async function createOrganization(organization: any, address: any) { 
    try {
        const createOrganization = await prisma.organization.create({
            data: {
                ...organization,
                address: {
                    create: address
                },
            }
        });
        return createOrganization
    } catch (error: any) {
        console.error(error)
        throw new Error(error)
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