import prisma from './db/prisma';

export async function findCategoryListByOrg(organizationId: string) {
	try {
		return (
			(await prisma.categoryList.findUnique({
				where: { organizationId },
				include: { categories: true },
			})) || []
		);
	} catch (error: any) {
		console.error(error);
		throw new Error(error);
	}
}
