import { PaymentDA } from '../data-access';
import StripeService from '../stripe';

/* =================================
PaymentController - controller class for payment processing actions

members:
processPurchase

================================= */

export default class PaymentController {
    static async processPurchase(req, res) {
        // input: userid, organizationid, { ...order }
        try {
            let { userId, organization, order } = req.body;
            // create stripe charge
            // on success, create order record
            // update the dispensary record with the order
            // update user record with the order.
            // return ?

            const charge = await StripeService.chargeBuyerTransaction(buyer, seller, transaction);
            const processOrder = await PaymentDA.processPurchase(order);
        } catch (error) {
            res.status(500).json({ error });
        }
    }
}
