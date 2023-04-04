import prisma from "./db/prisma";
export async function createProduct() {
    // try {
    // } catch (error) {
    //     console.error(error.message)
    //     throw new Error(error.message)
    // }
}
export async function findProductsByOrg(organizationIdList, page, limit) {
    try {
        const products = await prisma.product.findMany({
            skip: (page > 0 ? page - 1 : 0) * limit,
            take: limit,
            where: { organizationId: { in: organizationIdList } },
            orderBy: [
                { rating: 'desc' },
                // { sales: 'desc' }
            ],
            include: {
                variants: true,
                categories: true,
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
//# sourceMappingURL=product.js.map