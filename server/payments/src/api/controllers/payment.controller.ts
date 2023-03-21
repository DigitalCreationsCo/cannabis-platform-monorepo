import { PaymentDA } from '../data-access';

/* =================================
PaymentController - controller class for payment processing actions

members:

================================= */

export default class PaymentController {
    static async processPayment(req, res) {
        // request code here
        //
        //database access methods can be defined in paymentDAO.js
        try {
            const { paymentServicePayload } = req.body;
            // console.log("payment payload received: ", paymentServicePayload);
            console.log('payment payload received');
            // fix this line once the total handling is fixed on client sides
            const {
                order,
                order: { subTotal: total }
            } = paymentServicePayload;
            const { success, error } = await PaymentDA.processPayment({
                order,
                total
            });

            if (error) {
                console.log('error: ', error);
                res.status(401).json({ error });
            }
            console.log('success: ', success);
            res.json({ success });
        } catch (e) {
            res.status(500).json({ error: e });
        }
    }
}
