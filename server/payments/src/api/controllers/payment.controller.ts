import { TextContent } from '@cd/core-lib';
import {
	getStripeAccountId,
	type OrderCreateType,
	type OrderWithShopDetails,
} from '@cd/data-access';
import { PaymentDA } from '../data-access';
import StripeService from '../stripe';

/* =================================
PaymentController - controller class for payment processing actions

members:
createCheckout

================================= */

export default class PaymentController {
	/**
	 * Create a checkout session for frontend to use
	 *
	 */
	static async createCheckout(req, res) {
		try {
			console.log('create checkout input: ', req.body);
			const order: OrderWithShopDetails = req.body;

			if (!order) throw new Error('No order found.');

			if (!order.items || order.items.length === 0)
				throw new Error('No items in order');

			if (!order.organization.id)
				throw new Error('Sorry, your dispensary is not found.');

			if (!order.organization.stripeAccountId) {
				console.info('createCheckout: lookup stripe id..');
				order.organization.stripeAccountId = await getStripeAccountId(
					order.organizationId,
				);
				if (!order.organization.stripeAccountId)
					throw new Error(TextContent.error.DISPENSARY_NOT_ACCEPTING_PAYMENTS);
			}

			// handle in-service db op, if this call fails
			const _order = await PaymentDA.saveOrder(order);

			const checkout = await StripeService.checkout(
				_order as OrderCreateType & OrderWithShopDetails,
				_order.organization.stripeAccountId,
			);

			return res.status(302).json({
				success: 'true',
				message: 'Stripe checkout is created.',
				redirect: checkout.url,
			});
		} catch (error: any) {
			console.error('create checkout api: ', error.message);
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
}
