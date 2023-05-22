import {
    updateVariantQuantity
} from '@cd/data-access';

/* =================================
Product Data Access - data handling class for Product table

members: 
updateProductVariantQuantity

================================= */

export default class OrderDA {

    static async updateProductVariantQuantity(variantId:string, quantity:number) {
        try {
            const data = await updateVariantQuantity(variantId, quantity, '-')
            return data;
        } catch (error:any) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }
}