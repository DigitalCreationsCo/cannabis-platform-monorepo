// import prisma from './db/prisma';
export const productCategories: Category[] = [
	{ name: 'flowers', title: 'Flowers', icon: null },
	{ name: 'concentrates', title: 'Concentrates', icon: null },
	{ name: 'edibles', title: 'Edibles', icon: null },
	{ name: 'topicals', title: 'Topicals', icon: null },
	{ name: 'vapes', title: 'Vapes', icon: null },
];

export interface Category {
	name: string;
	title: string;
	icon: string | null;
}

// export async function findCategoryListByOrg(organizationId: string) {
// 	try {
// 		return (
// 			(await prisma.categoryList.findUnique({
// 				where: { organizationId },
// 				include: { categories: true },
// 			})) || []
// 		);
// 	} catch (error: any) {
// 		console.error(error);
// 		throw new Error(error);
// 	}
// }
