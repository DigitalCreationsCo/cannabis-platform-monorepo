import {
	Category,
	Organization,
	Prisma,
	Product,
	Review,
} from '@prisma/client';
import prisma from './db/prisma';
import { UserWithProfilePictureBlob } from './user';
import { ProductVariantWithDetails } from './variant';

export async function createProduct() {
	// try {
	// } catch (error) {
	//     console.error(error.message)
	//     throw new Error(error.message)
	// }
}

export async function findProductsByOrg(
	organizationIdList: string[],
	page: number,
	limit: number,
) {
	try {
		const products =
			(await prisma.product.findMany({
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
				},
			})) || [];
		return products;
	} catch (error: any) {
		console.error(error.message);
		throw new Error(error.message);
	}
}

export async function findProductWithDetails(id: string) {
	try {
		const product = await prisma.product.findUnique({
			where: { id },
			include: {
				categories: true,
				organization: true,
				reviews: {
					include: { user: { include: { profilePicture: true } } },
				},
				variants: {
					include: { images: true },
				},
			},
		});
		return product;
	} catch (error: any) {
		console.error(error);
		throw new Error(error);
	}
}

export async function findProductsByText(
	search: string,
	organizationId: string,
) {
	try {
		const products =
			(await prisma.product.findMany({
				where: {
					organizationId,
					OR: [
						{
							name: {
								contains: search,
							},
						},
						{
							description: {
								contains: search,
							},
						},
						{
							features: {
								contains: search,
							},
						},
						{
							tags: {
								contains: search,
							},
						},
					],
				},
				orderBy: [{ rating: 'desc' }],
				include: {
					variants: {
						include: { images: true },
					},
				},
			})) || [];
		return products;
	} catch (error: any) {
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

export type ProductWithDashboardDetails = Product & {
	variants: ProductVariantWithDetails[];
	categories: Category[];
	reviews: ReviewWithUserDetails[];
};

export type ProductWithShopDetails = Product & {
	organization: Organization | undefined;
	variants: ProductVariantWithDetails[];
	categories: Category[];
	reviews?: ReviewWithUserDetails[];
};

export type ReviewWithUserDetails = Review & {
	user: UserWithProfilePictureBlob;
};

export type ProductUpdate = Prisma.ProductUpdateArgs['data'];
