import {
    createOrder,
    createPurchase, findOrdersByOrg,
    findOrderWithDetails,
    findProductsByOrg,
    findProductsByText,
    findProductWithDetails, OrderCreate, PurchaseCreate,
    updateOrderWithOrderItems,
    updateVariantQuantity
} from '@cd/data-access';

/* =================================
Order Data Access - data class for order table

members: 
createOrder
createPurchase

getOrdersByOrg
getOrderById
updateOrderById

getProductsByOrg
getProductById
searchProducts

updateProductVariantQuantity

================================= */

export default class OrderDA {
    static async createOrder(order:OrderCreate) {
        try {
            const data = await createOrder(order);
            return data;
        } catch (error) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }

    static async createPurchase(purchase:PurchaseCreate) {
        try {
            const data = await createPurchase(purchase);
            return data;
        } catch (error) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }

    static async getOrdersByOrg(organizationId) {
        try {
            const data = await findOrdersByOrg(organizationId);
            return data;
        } catch (error) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }

    static async getOrderById(id) {
        try {
            const data = await findOrderWithDetails(id);
            return data;
        } catch (error) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }

    static async updateOrderById(order) {
        try {
            const data = await updateOrderWithOrderItems(order);
            return data;
        } catch (error) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }

    static async getProductsByOrg(
        organizationIdList: string | string[], 
        page: number = 1, 
        limit: number = 20
        ) {
        try {
            
            const idList = Array.isArray(organizationIdList) ? organizationIdList : [organizationIdList];

            const data = await findProductsByOrg(idList, page, limit);
            return data;
        } catch (error) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }

    static async getProductById(id) {
        try {
            const data = await findProductWithDetails(id);
            return data;
        } catch (error) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }

    static async searchProducts(search, organizationId = null) {
        try {
            const data = await findProductsByText(search, organizationId);
            return data;
        } catch (error) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }

    static async updateProductVariantQuantity(variantId:string, quantity:number) {
        try {
            const data = await updateVariantQuantity(variantId, quantity, '-')
            return data;
        } catch (error) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }
}
