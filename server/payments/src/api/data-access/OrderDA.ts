import {
    findOrdersByOrg,
    findOrderWithDetails,
    findProductsByOrg,
    findProductsByText,
    findProductWithDetails,
    updateOrderWithOrderItems,
} from '@cd/data-access';

/* =================================
Order Data Access - data class for order table

members: 
getOrdersByOrg
getOrderById
updateOrderById

getProductsByOrg
getProductById
searchProducts

================================= */

export default class OrderDA {
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

    static async getProductsByOrg(organizationId) {
        try {
            const data = await findProductsByOrg(organizationId);
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
}
