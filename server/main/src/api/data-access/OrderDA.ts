import {
    createOrder,
    createPurchase, findOrdersByOrg,
    findOrderWithDetails,
    findProductsByOrg,
    findProductsByText,
    findProductWithDetails, OrderStatus, OrderWithDetails, PurchaseCreate,
    updateOrder,
    updateOrderWithOrderItems
} from '@cd/data-access';
import { MongoClient } from 'mongodb';

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

================================= */

let dispatchOrders = null
const dispatch_namespace = process.env.DISPATCH_DB_NS;

export default class OrderDA {
    static async useMongoDB (mongoClient: MongoClient) {
        
        if (dispatchOrders) 
        return
        
        try {
            dispatchOrders = await mongoClient.db(dispatch_namespace).collection("dispatch");
        } catch (e) {
            console.error(`Unable to establish collection handle in OrderDA: ${e}`);
        }
    }

    static async createOrder(order: OrderWithDetails): Promise<OrderWithDetails> {
        try {
            const data = await createOrder(order);
            return data;
        } catch (error:any) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }

    static async createPurchase(purchase:PurchaseCreate) {
        try {
            const data = await createPurchase(purchase);
            return data;
        } catch (error:any) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }

    static async getOrdersByOrg(organizationId) {
        try {
            const data = await findOrdersByOrg(organizationId);
            return data;
        } catch (error:any) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }

    static async getOrderById(id) {
        try {
            const data = await findOrderWithDetails(id);
            return data;
        } catch (error:any) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }

    static async updateOrderById(order) {
        try {
            const data = await updateOrderWithOrderItems(order);
            return data;
        } catch (error:any) {
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
        } catch (error:any) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }

    static async getProductById(id) {
        try {
            const data = await findProductWithDetails(id);
            return data;
        } catch (error:any) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }

    static async searchProducts(search, organizationId = null) {
        try {
            const data = await findProductsByText(search, organizationId);
            return data;
        } catch (error:any) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }

    static async updateOrderFulfillmentStatus(orderId: string, orderStatus: OrderStatus) {
        try {
            
            const data = await updateOrder(orderId, { orderStatus });

            return data;
        } catch (error:any) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }

    static async addDispatchRecordMongo(order: OrderWithDetails) {
        try {
            
            const 
            insertOrder = await dispatchOrders.insertOne({ 
              ...order
            });

            return insertOrder;
            
        } catch (error: any) {
            console.error('addDispatchRecordMongo error: ', error.message);
            throw new Error(error.message);
        }
      }
}
