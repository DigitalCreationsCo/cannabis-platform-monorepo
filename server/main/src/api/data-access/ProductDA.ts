import { updateVariantQuantity } from '@cd/data-access';

/* =================================
Product Data Access - data handling class for Product table

members: 
updateProductVariantQuantity

================================= */

export default class ShopDA {
	static async updateProductVariantQuantity(
		variantId: string,
		quantity: number,
	) {
		try {
			return await updateVariantQuantity(variantId, quantity, '-');
		} catch (error: any) {
			console.error(error.message);
			throw new Error(error.message);
		}
	}
}
