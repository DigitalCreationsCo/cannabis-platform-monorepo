import { getStripeAccountId, type OrderWithDetails } from '@cd/data-access';
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
			const order: OrderWithDetails = req.body;

			if (!order) throw new Error('No order found.');

			if (!order.items || order.items.length === 0)
				throw new Error('No items in order');

			if (!order.organization.id)
				throw new Error('Sorry, your dispensary is not found.');

			let stripeAccountId = order.organization.stripeAccountId;

			if (!stripeAccountId)
				stripeAccountId = await getStripeAccountId(order.organizationId);

			// console.error('lookup stride account id')
			// console.error('stripe account id: ', stripeAccountId)

			if (!stripeAccountId)
				throw new Error(
					`We're sorry, but this dispensary is not accepting payments at this time.`,
				);

			const checkout = await StripeService.createCheckout(
				order,
				stripeAccountId,
			);

			await PaymentDA.saveOrder(order);

			return res.status(302).json({
				success: 'true',
				message: 'Stripe checkout is created.',
				redirect: checkout.url,
			});
		} catch (error: any) {
			console.error('create checkout error: ', error.message);
			if (
				error.message === 'No order found.' ||
				error.message === 'Sorry, your dispensary is not found.' ||
				error.message ===
					`We're sorry, but this dispensary is not accepting payments at this time.` ||
				error.message === 'No items in order'
			)
				return res.status(400).json({ success: 'false', error: error.message });

			return res.status(500).json({ success: 'false', error: error.message });
		}
	}

	/**
	 * Process a customer purchase on the backend
	 * This function uses the stripe api to create a charge for the customer,
	 * it does not use stripe checkout api.
	 *
	 * This function also creates a new order record, and updates product stock levels.
	 * Not necessary to use at the moment, but we are not tracking customer product stock levels
	 *
	 */

	// static async processPurchase(req, res) {
	//     // input: userid, organizationid, { ...order }
	//     try {
	//         let { userId, organization, order } = req.body;
	//         // const charge = await StripeService.chargeBuyerPurchase(buyer, seller, transaction);

	//         // create checkout session
	//         // createOrder record in database
	//         // create stripe charge
	//         // on success, update order record
	//         // update the dispensary record with the order
	//         // update user record with the order.
	//         // return something to the client

	//         const charge = await StripeService.chargeCustomerPurchase();
	//         const processOrder = await PaymentDA.processPurchase(order, charge);
	//     } catch (error: any) {
	//         res.status(500).json({ error });
	//     }
	// }
}
