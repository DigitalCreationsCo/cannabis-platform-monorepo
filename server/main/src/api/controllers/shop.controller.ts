import { OrderCreate, OrderWithDetails } from '@cd/data-access';
import { OrderDA } from '../data-access';
// import Stripe from "stripe";
// import stipeNode from "stripe";

/* =================================
ShopController - controller class for ecommerce business actions

members:

processOrder

getOrdersByOrg
getOrderById
updateOrderById

getProductsByMultipleOrgs
getProductsByOrg
getProductById
searchProducts

================================= */

export default class ShopController {
    static async processOrder(req, res) {
        // self contained order handling function
        // create Order record, add order to user record, add order to dispensary,
        // decrement item stock
        try {
            let orderPayload:OrderCreate = req.body.order
            let order:OrderWithDetails
            let charge = req.body.charge

            // create payment record
            // add order to user record, add order to dispensary,
            // decrement item stock
            const purchase = await OrderDA.createPurchase({
                orderId: orderPayload.id,
                gateway: "stripe",
                type: charge.payment_method_details.type,
                amount: charge.amount / 100,
                token: charge.id,
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            order = await OrderDA.createOrder({
                ...orderPayload,
                purchaseId: purchase.id,
                orderStatus: 'Processing'
            })

            // decrement the product stock
            order.items.forEach(async (item) => {
                const updateProductVariantQuantity = await OrderDA.updateProductVariantQuantity(item.variantId, item.quantity)
            })
    
            return res.status(201).json({ message: "Order created Successfully" });
            
        } catch (error: any) {
            console.log('API error shopcontroller: createOrder: ', error);
            res.status(500).json({ error });
      }
    }

    static async getOrdersByOrg(req, res) {
        try {
            const organizationId = req.params.id || {};
            const data = await OrderDA.getOrdersByOrg(organizationId);
            if (!data) return res.status(404).json('Orders not found');
            return res.status(200).json(data);
        } catch (error: any) {
            console.log('API error: ', error);
            res.status(500).json({ error });
        }
    }

    static async getOrderById(req, res) {
        try {
            const id = req.params.id || '';
            const data = await OrderDA.getOrderById(id);
            // this is the preferred pattern for controller responses VV
            // across ALL apps and systems
            if (!data) return res.status(404).json('Order not found');
            return res.status(200).json(data);
        } catch (error: any) {
            console.log('API error: ', error);
            res.status(500).json({ error });
        }
    }

    static async updateOrderById(req, res) {
        try {
            const order = req.body;
            const data = await OrderDA.updateOrderById(order);
            if (!data) return res.status(400).json('Could not update');
            return res.status(200).json(data);
        } catch (error: any) {
            console.log('API error: ', error);
            res.status(500).json({ error });
        }
    }

    static async getProductsByOrg(req, res) {
        try {
            const organizationId = req.params.id || {};
            
            const data = await OrderDA.getProductsByOrg(organizationId);
            if (!data) return res.status(404).json('Products not found');
            return res.status(200).json(data);
        } catch (error: any) {
            console.log('API error: ', error);
            res.status(500).json({ error });
        }
    }

    static async getProductsByMultipleOrgs(req, res) {
        try {
            const idList = req.body || [];
            const { page, limit } = req.params;
            
            const data = await OrderDA.getProductsByOrg(idList, page, limit);
            if (!data) return res.status(404).json('Products not found');
            return res.status(200).json(data);
        } catch (error: any) {
            console.log('API error: ', error);
            res.status(500).json({ error });
        }
    }

    static async getProductById(req, res) {
        try {
            const id = req.params.id || '';
            const data = await OrderDA.getProductById(id);
            // this is the preferred pattern for controller responses VV
            // across ALL apps and systems
            if (!data) return res.status(404).json('Product not found');
            return res.status(200).json(data);
        } catch (error: any) {
            console.log('API error: ', error);
            res.status(500).json({ error });
        }
    }

    static async searchProducts(req, res) {
        try {
            const { search, organizationId } = req.body;
            const data = await OrderDA.searchProducts(search, organizationId);
            if (!data) return res.status(404).json('Products Not Found');
            return res.status(200).json(data);
        } catch (error: any) {
            console.log('API error: ', error);
            res.status(500).json({ error });
        }
    }
}
