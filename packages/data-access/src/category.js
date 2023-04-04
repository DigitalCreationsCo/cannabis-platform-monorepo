import prisma from "./db/prisma";
export async function findCategoryListByOrg(organizationId) {
    try {
        const categoryList = await prisma.categoryList.findUnique({
            where: { organizationId },
            include: { categories: true }
        }) || [];
        return categoryList;
    }
    catch (error) {
        console.error(error);
        throw new Error(error);
    }
}
//# sourceMappingURL=category.js.map