import {
	calculatePlatformFeeForTransaction,
	generateCheckoutLineItemsFromOrderItems,
	TextContent,
	type CheckoutSessionMetaData,
} from '@cd/core-lib';
import { type OrderWithDetails } from '@cd/data-access';
import Stripe from 'stripe';
import { PaymentDA } from '../data-access';

/* =================================
Stripe Service

handleWebhookEvents
createCheckout
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
	async createCheckout(
		order: OrderWithDetails,
		dispensaryStripeAccountId: string,
	) {
		try {
			return await this.stripe.checkout.sessions.create({
				mode: 'payment',
				success_url: process.env.NEXT_PUBLIC_SHOP_APP_CHECKOUT_SUCCESS_URL,
				cancel_url: `${process.env.NEXT_PUBLIC_SHOP_APP_URL}/checkout`,
				line_items: generateCheckoutLineItemsFromOrderItems(order.items),
				payment_intent_data: {
					application_fee_amount: calculatePlatformFeeForTransaction(123),
					transfer_data: {
						// destination: process.env.STRIPE_PLATFORM_ID,
						destination: dispensaryStripeAccountId,
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
			console.error('stripe create checkout error: ', error);
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
			case 'checkout.session.completed':
				// Retrieve the session. If you require line items in the response, you may include them by expanding line_items.
				// const
				// checkoutSessionWithOrderMetaData =
				// await this.stripe.checkout.sessions.retrieve(
				//     event.data.object.id,
				//     { expand: ['lineItems'] }
				// );

				// eslint-disable-next-line no-case-declarations
				const order = event.data.object.metadata as CheckoutSessionMetaData;

				await PaymentDA.startFulfillment(order.id);
				break;

			case 'charge.succeeded':
				// create sale record or Order record for dispensary
				break;

			case 'payment_intent.succeeded':
				// generate customer invoice
				break;

			default:
				console.info(`Unhandled stripe event type ${event.type}`);
		}
	}

	/**
//      * INCOMPLETE Create a stripe charge for a customer purchase
//      */
	//  async chargeCustomerPurchase() {
	//     try {
	//         // const { values, customerId, amount, tax, items, subtotal } = req.body

	//     // const {
	//     //   cardCVC,
	//     //   cardNumber,
	//     //   cardYear,
	//     //   cardMonth,
	//     //   cardHolderName,
	//     //   checkCard,
	//     //   card,
	//     //   address,
	//     //   date,
	//     //   time,
	//     //   paymentType,
	//     // } = values;

	//     // const user = await User.findById(req.user);

	//     // const orderData = {
	//     //   tax,
	//     //   items,
	//     //   paymentType,
	//     //   total: amount,
	//     //   customerId: user._id,
	//     //   preTaxTotal: subTotal,
	//     //   expectedDeliveryDate: date,
	//     //   expectedDeliveryTime: time,
	//     //   shipping: {
	//     //     email: user.email,
	//     //     name: address.name,
	//     //     city: address.city,
	//     //     phone: address.phone,
	//     //     postalCode: address.zip,
	//     //     country: address.country,
	//     //     address: address.street1 + address.street2,
	//     //   },
	//     // };

	//     // if (paymentType === "card") {
	//     //     let charged: Stripe.Response<Stripe.Charge>;
	//     //     if (!checkCard && cardCVC && cardNumber && cardYear && cardMonth && cardHolderName) {
	//     //       const cardToken = await createCardToken({
	//     //         cardHolderName,
	//     //         cardNumber,
	//     //         cardMonth,
	//     //         cardYear,
	//     //         cardCVC,
	//     //         address,
	//     //       });

	//     //       if (values.cardSaved) {
	//     //         const card = await stripe.customers.createSource(customerId, { source: cardToken.id });
	//     //         charged = await createCharge({ amount, source: card.id, customer: customerId });
	//     //       } else {
	//     //         const card = await stripe.customers.createSource(customerId, { source: cardToken.id });
	//     //         charged = await createCharge({ amount, source: card.id, customer: customerId });
	//     //         await stripe.customers.deleteSource(customerId, card.id);
	//     //       }
	//     //     }

	//     //     if (card && checkCard) {
	//     //       charged = await createCharge({ amount, source: card.cardId, customer: customerId });
	//     //     }

	//     // Research the multimarketplace approach to stripe connect, and continue writing these funcs
	//         // const charge = await this.stripe.charges.create(stripeAccountId);
	//         // return charge
	//         return {}
	//     } catch (error: any) {
	//         console.error(error.message);
	//         throw new Error(error.message);
	//     }
	// }
}

const stripeService = new StripeService(process.env.STRIPE_API_KEY_SECRET, {
	apiVersion: process.env.STRIPE_API_VERSION,
});

export default stripeService;
