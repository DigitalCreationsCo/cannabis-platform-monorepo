import prisma from "./db/prisma";
export async function createProduct() {
    // try {
    // } catch (error) {
    //     console.error(error.message)
    //     throw new Error(error.message)
    // }
}
export async function findProductsByOrg(organizationId) {
    try {
        const products = await prisma.product.findMany({
            where: { organizationId },
            orderBy: [
                { rating: 'desc' },
            ],
            include: {
                variants: {
                    include: {
                        images: true
                    }
                }
            }
        }) || [];
        return products;
    }
    catch (error) {
        console.error(error.message);
        throw new Error(error.message);
    }
}
export async function findProductWithDetails(id) {
    try {
        const product = await prisma.product.findUnique({
            where: { id },
            include: {
                categories: true,
                organization: true,
                reviews: {
                    include: { user: { include: { imageUser: true } } }
                },
                variants: {
                    include: { images: true }
                },
            }
        });
        return product;
    }
    catch (error) {
        console.error(error);
        throw new Error(error);
    }
}
export async function findProductsByText(search, organizationId) {
    try {
        const products = await prisma.product.findMany({
            where: {
                organizationId,
                OR: [
                    {
                        name: {
                            contains: search
                        },
                    },
                    {
                        description: {
                            contains: search
                        },
                    },
                    {
                        features: {
                            contains: search
                        },
                    },
                    {
                        tags: {
                            contains: search
                        }
                    }
                ],
            },
            orderBy: [
                { rating: 'desc' },
            ],
            include: {
                variants: {
                    include: { images: true }
                },
            }
        }) || [];
        return products;
    }
    catch (error) {
        console.error(error.message);
        throw new Error(error.message);
    }
}
export async function deleteProduct() {
    // try {
    // } catch (error) {
    //     console.error(error.message)
    //     throw new Error(error.message)
    // }
}
