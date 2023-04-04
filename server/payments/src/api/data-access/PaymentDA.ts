import { Order } from "@cd/data-access";
import axios from "axios";

/* =================================
Payment Data Access - data class for order table

members: 
processPurchase

================================= */

export default class PaymentDA {
    static async processPurchase(order:Order, charge) {
        try {
            // send proxy request to main server to process order
            const createOrder = await axios.post(process.env.SERVER_MAIN_URL + '/api/v1/shop/orders', { order, charge });

            return createOrder;
        } catch (error) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }
}
