import prisma from "./db/prisma";

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
        const users = (await prisma.user.findMany({
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
        })) || []
        return users
    } catch (error: any) {
        console.error(error)
        throw new Error(error)
    }
}