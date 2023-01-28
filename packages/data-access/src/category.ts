import prisma from "./db/prisma";

export async function findCategoryListByOrg(organizationId:string) {
    try {
        const categoryList = await prisma.categoryList.findUnique({
            where: { organizationId },
            include: { categories: true }
        }) || []
        return categoryList
    } catch (error: any) {
        console.error(error)
        throw new Error(error)
    }
}