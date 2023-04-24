import { OrderWithDetails } from '@cd/data-access';
import { PaymentDA } from '../data-access';
import StripeService from '../stripe';

/* =================================
PaymentController - controller class for payment processing actions

members:
createCheckout
processPurchase

================================= */

export default class PaymentController {

    /**
     * Create a checkout session for frontend to use
     * 
     */
    static async createCheckout(req, res) {
        try {
            const order: OrderWithDetails = req.body
            console.log('payment server createCheckout order: ', order)
            // if (order && order.items.length > 0) {
            //     const stripeAccountId = await getStripeAccountId(order.organizationId)
            //     const checkout = await StripeService.createCheckout(order, stripeAccountId);

            //     return res.writeHead(302, {
            //         'Location': checkout.url
            //     })
            // } else throw new Error('No items in order');
        } catch (error: any) {
            res.status(500).json({ error });
        }
    }
    
    /**
     * Process a customer purchase on the backend
     * 
     */
    static async processPurchase(req, res) {
        // input: userid, organizationid, { ...order }
        try {
            let { userId, organization, order } = req.body;
            // const charge = await StripeService.chargeBuyerPurchase(buyer, seller, transaction);

            // create checkout session
            // createOrder record in database
            // create stripe charge
            // on success, update order record
            // update the dispensary record with the order
            // update user record with the order.
            // return something to the client
            
            const charge = await StripeService.chargeCustomerPurchase();
            const processOrder = await PaymentDA.processPurchase(order, charge);
        } catch (error: any) {
            res.status(500).json({ error });
        }
    }
}
