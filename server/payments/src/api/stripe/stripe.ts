/* eslint-disable no-case-declarations */
import {
	calculateDeliveryFeeForTransaction,
	calculatePlatformFeeForTransaction,
	generateCheckoutLineItemsFromOrderItems,
	TextContent,
	type CheckoutSessionMetaData,
} from '@cd/core-lib';
import { type OrderCreateType, type ProductVariant } from '@cd/data-access';
import Stripe from 'stripe';
import { PaymentDA } from '../data-access';

/* =================================
Stripe Service

handleWebhookEvents
checkout
getAccount
createDispensaryAccount
createDispensaryAccountLink
checkOnboardAccount

================================= */
class StripeService {
	stripe: Stripe;
	constructor(apiKey, config) {
		this.stripe = new Stripe(apiKey, config);
	}

	/**
	 * Create stripe checkout session for frontend
	 * @param order
	 * @param dispensaryStripeAccountId
	 */
	async checkout(order: OrderCreateType, dispensaryStripeAccountId: string) {
		try {
			return await this.stripe.checkout.sessions.create({
				mode: 'payment',
				success_url: process.env.NEXT_PUBLIC_SHOP_APP_CHECKOUT_SUCCESS_URL,
				cancel_url: `${process.env.NEXT_PUBLIC_SHOP_APP_URL}/checkout`,
				line_items: generateCheckoutLineItemsFromOrderItems(
					order.items as ProductVariant[],
				),
				shipping_options: [
					{
						shipping_rate_data: {
							display_name: 'Delivery Fee',
							type: 'fixed_amount',
							fixed_amount: {
								amount: calculateDeliveryFeeForTransaction(order.total),
								currency: 'usd',
							},
							delivery_estimate: {
								maximum: {
									unit: 'hour',
									value: 2,
								},
							},
						},
					},
				],
				payment_intent_data: {
					description: `Order from ${order.organization.name}`,
					on_behalf_of: dispensaryStripeAccountId,
					receipt_email: order.customer.email,
					capture_method: 'automatic',
					application_fee_amount: calculatePlatformFeeForTransaction(123),
					transfer_data: {
						destination: dispensaryStripeAccountId,
					},
					shipping: {
						name: order.customer.firstName + ' ' + order.customer.lastName,
						address: {
							line1: order.destinationAddress.street1,
							line2: order.destinationAddress.street2,
							city: order.destinationAddress.city,
							state: order.destinationAddress.state,
							postal_code: order.destinationAddress.zipcode.toString(),
							country: order.destinationAddress.country,
						},
					},
				},
				customer_email: order.customer.email,
				metadata: {
					id: order.id,
					addressId: order.addressId,
					customerId: order.customerId,
					organizationId: order.organizationId,
				},
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	// REFUND AN APPLICATION FEE
	// const refund = await stripe.refunds.create({
	// 	charge: '{CHARGE_ID}',
	// 	reverse_transfer: true,
	// 	refund_application_fee: true,
	//   });

	/**
	 * Get stripe connected account details using accountId
	 * @param stripeAccountId string
	 */
	async getAccount(stripeAccountId: string) {
		try {
			return await this.stripe.accounts.retrieve(stripeAccountId);
		} catch (error: any) {
			console.error(error.message);
			throw new Error(error.message);
		}
	}

	/**
	 * create a stripe connected account for dispensary
	 * @param accountParams
	 * @returns stripe account object
	 */
	async createDispensaryAccount(accountParams: Stripe.CustomerCreateParams) {
		try {
			if (!accountParams)
				throw new Error('Dispensary Stripe Account Params are required!');

			return await this.stripe.accounts.create(accountParams);
		} catch (error: any) {
			console.error(error.message);
			throw new Error(error.message);
		}
	}

	/**
	 * Create a stripe account link for dispensary to create a connected account
	 * @param params
	 * @returns
	 */
	async createDispensaryAccountLink(params: Stripe.AccountLinkCreateParams) {
		try {
			if (!params || !params.account)
				throw new Error('Dispensary Stripe Account Link Params are required!');

			return await this.stripe.accountLinks.create(params);
		} catch (error: any) {
			console.error(error.message);
			throw new Error(error.message);
		}
	}

	async checkOnboardAccount(stripeAccountId: string) {
		try {
			const account = await this.stripe.accounts.retrieve(stripeAccountId);
			if (!account) throw new Error(TextContent.error.STRIPE_ACCOUNT_NOT_FOUND);
			return account.details_submitted;
		} catch (error: any) {
			console.error(error.message);
			throw new Error(error.message);
		}
	}

	constructStripeEvent(payload, sig): Stripe.Event {
		try {
			return this.stripe.webhooks.constructEvent(
				payload,
				sig,
				process.env.STRIPE_WEBHOOK_SECRET,
			);
		} catch (error: any) {
			console.error('StripeService: construct event: ', error.message);
			throw new Error(error.message);
		}
	}

	async handleWebhookEvents(event: any) {
		switch (event.type) {
			case 'checkout.session.async_payment_failed':
				const checkoutSessionAsyncPaymentFailed = event.data.object;
				console.info(
					'checkoutSessionAsyncPaymentFailed: ',
					checkoutSessionAsyncPaymentFailed,
				);
				// Then define and call a function to handle the event checkout.session.async_payment_failed
				break;

			case 'checkout.session.async_payment_succeeded':
				const checkoutSessionAsyncPaymentSucceeded = event.data.object;
				console.info(
					'checkoutSessionAsyncPaymentSucceeded: ',
					checkoutSessionAsyncPaymentSucceeded,
				);
				// Then define and call a function to handle the event checkout.session.async_payment_succeeded
				break;

			case 'checkout.session.completed':
				// Retrieve the session. If you require line items in the response, you may include them by expanding line_items.
				// const
				// checkoutSessionWithOrderMetaData =
				// await this.stripe.checkout.sessions.retrieve(
				//     event.data.object.id,
				//     { expand: ['lineItems'] }
				// );

				const order = event.data.object.metadata as CheckoutSessionMetaData;
				await PaymentDA.startFulfillment(order.id);
				break;

			case 'charge.succeeded':
				// create sale record or Order record for dispensary
				console.info('charge.succeeded: ', event.data.object);
				break;

			case 'payment_intent.succeeded':
				// generate customer invoice
				console.info('payment_intent.succeeded: ', event.data.object);
				break;
			case 'checkout.session.expired':
				const checkoutSessionExpired = event.data.object;
				console.info('checkoutSessionExpired: ', checkoutSessionExpired);
				// Then define and call a function to handle the event checkout.session.expired
				break;
			// ... handle other event types
			default:
				console.info(`Unhandled stripe event type ${event.type}`);
		}
	}
}

const stripeService = new StripeService(process.env.STRIPE_API_KEY_SECRET, {
	apiVersion: process.env.STRIPE_API_VERSION,
});

export default stripeService;
