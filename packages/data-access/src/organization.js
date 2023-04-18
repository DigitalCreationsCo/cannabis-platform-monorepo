import prisma from "./db/prisma";
/*
*   createOrganization
*   findOrganizationById
*   findUsersByOrganization
*   findOrganizationBySubdomain
*   findLocalOrganizations
*   updateOrganization
*/
export async function createOrganization(organization) {
    try {
        organization.subdomainId = organization.name.toLowerCase();
        const { vendorId, address, subdomainId, ...data } = organization;
        const { coordinates, userId, ...addressData } = address;
        const { latitude, longitude } = coordinates;
        console.log('coordinates here', coordinates);
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
                vendor: {
                    connectOrCreate: {
                        where: { id: vendorId },
                        create: { id: vendorId, name: organization.name, publicName: organization.name }
                    }
                },
                // add default site settings
            }
        });
        return createOrganization;
    }
    catch (error) {
        console.error('ERROR: ', error.message);
        if (error.code === 'P2002') {
            throw new Error('error creating organization, unique key exists');
        }
        else
            throw new Error('error creating organization');
    }
}
export async function findOrganizationById(organizationId) {
    try {
        const organization = await prisma.organization.findUnique({ where: { id: organizationId } }) || {};
        return organization;
    }
    catch (error) {
        console.error(error);
        throw new Error(error);
    }
}
export async function findUsersByOrganization(organizationId) {
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
        return users;
    }
    catch (error) {
        console.error(error);
        throw new Error(error);
    }
}
export async function findOrganizationBySubdomain(subdomainId) {
    try {
        const organization = await prisma.subDomain.findUnique({ where: { id: subdomainId }, include: { organization: { include: { address: true, images: true, products: true, siteSetting: true, categoryList: true } } } }) || {};
        return organization;
    }
    catch (error) {
        console.error(error);
        throw new Error(error);
    }
}
export async function findLocalOrganizationsById(organizationIds) {
    try {
        const localOrganizations = await prisma.organization.findMany({ where: { id: { in: organizationIds } }, include: { address: true, images: true, products: true, siteSetting: true, categoryList: true } }) || [];
        return localOrganizations;
    }
    catch (error) {
        console.error(error);
        throw new Error(error);
    }
}
export async function updateOrganizationRecord(id, data) {
    try {
        const update = await prisma.organization.update({ where: { id }, data: { ...data } });
        return update;
    }
    catch (error) {
        console.error(error);
        throw new Error(error);
    }
}
export async function updateStripeAccountDispensary(id, stripeAccountId, accountParams = {}) {
    try {
        const update = await prisma.organization.update({ where: { id }, data: { stripeAccountId, ...accountParams } });
        return update;
    }
    catch (error) {
        console.error(error);
        throw new Error(error);
    }
}
