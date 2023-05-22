import { urlBuilder } from "@cd/core-lib";
import { OrderWithDetails } from "@cd/data-access";
import axios from "axios";

/* =================================
Payment Data Access - data class for order table

members: 
processPurchase

================================= */

export default class PaymentDA {

    static async saveOrder(order:OrderWithDetails) {
        try {
            
            await axios.post(
                urlBuilder.main.orders(), 
                order);
                
        } catch (error: any) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }

    static async startFulfillment(orderId: string) {
        try {

            await axios.post(
                urlBuilder.main.fulfillOrder(),
                { orderId });
                
        } catch (error: any) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }

    /**
     * self contained order processing and fulfillment function, 
     * - create Order record, 
     * add order to user record, 
     * add order to dispensary,
     * and decrement item stock
     * */
    // static async processPurchase(order:Order, charge) {
    //     try {
    //         // send proxy request to main server to process order
    //         const createOrder = await axios.post(process.env.SERVER_MAIN_URL + '/api/v1/shop/orders', { order, charge });

    //         return createOrder;
    //     } catch (error: any) {
    //         console.error(error.message);
    //         throw new Error(error.message);
    //     }
    // }
}
