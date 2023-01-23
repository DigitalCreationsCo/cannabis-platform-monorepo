// BROKEN - fix it

export async function findSiteSettingBySlug(slug, organizationId) {
    try {
        const products =
            (await prisma?.siteSetting.findUnique({
                where: { organizationId },
                orderBy: [{ rating: 'desc' }],
                include: {
                    variants: {
                        include: {
                            images: true,
                        },
                    },
                },
            })) || [];
        return products;
    } catch (error) {
        console.error(error.message);
        throw new Error(error.message);
    }
}
