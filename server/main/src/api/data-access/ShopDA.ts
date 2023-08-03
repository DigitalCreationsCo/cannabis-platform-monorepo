import { updateVariantQuantity } from '@cd/data-access';

/* =================================
Shop Data Access - data class for shop table

members: 

================================= */

export default class ShopDA {
	static async updateProductVariantQuantity(
		variantId: string,
		quantity: number
	) {
		try {
			const data = await updateVariantQuantity(variantId, quantity, '-');
			return data;
		} catch (error: any) {
			console.error(error.message);
			throw new Error(error.message);
		}
	}
}
