import { calculatePlatformFeeForTransaction, generateCheckoutLineItemsFromOrderItems } from "@cd/core-lib";
import { OrderWithDetails } from "@cd/data-access";
import Stripe from "stripe";
import { PaymentDA } from "../data-access";

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
    async createCheckout(order: OrderWithDetails, dispensaryStripeAccountId: string) {      
        try {
            let
            session = await this.stripe.checkout.sessions.create({
                mode: 'payment',
                success_url: process.env.NEXT_PUBLIC_SHOP_APP_CHECKOUT_SUCCESS_URL,
                cancel_url: `${process.env.NEXT_PUBLIC_SHOP_APP_URL}/checkout`,
                line_items: generateCheckoutLineItemsFromOrderItems(order.items),
                
                payment_intent_data: {
                    application_fee_amount: calculatePlatformFeeForTransaction(123),
                    transfer_data: {
                        destination: dispensaryStripeAccountId
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
            
            return session
            
        } catch (error: any) {
            console.error('stripe create checkout error: ', error)
            throw new Error(error.message)
        }
    }

    /**
     * Get stripe connected account details using accountId
     * @param stripeAccountId string
     */
    async getAccount(stripeAccountId: string) {
        try {
            const 
            account = await this.stripe.accounts.retrieve(stripeAccountId);
            
            return account
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
            
            const account = await this.stripe.accounts.create(accountParams);
            
            return account;
            
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
            
            const accountLink = await this.stripe.accountLinks.create(params);
            
            return accountLink;
            
        } catch (error: any) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }

    async checkOnboardAccount(stripeAccountId: string) {
        try {
            const 
            account = await this.stripe.accounts.retrieve(stripeAccountId);
            
            if (!account) 
            throw new Error('Stripe account is not found.');

            return account.details_submitted
        } catch (error: any) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }

    constructStripeEvent (payload, sig): Stripe.Event {
        try {
            
            const
            event = this.stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_SECRET);

            return event
            
        } catch (error: any) {
            console.error('StripeService: construct event: ', error.message);
            throw new Error(error.message);
        }
    }

    async handleWebhookEvents (event: Stripe.Event) {
        if (event.type === 'checkout.session.completed') {
            // Retrieve the session. If you require line items in the response, you may include them by expanding line_items.

            console.log('event object: ', event.data)
            
            const 
            checkoutSessionWithOrderMetaData = 
            await this.stripe.checkout.sessions.retrieve(
                event.data.object.id, 
                { expand: ['metadata'] }
            );

            console.log(checkoutSessionWithOrderMetaData);

            const 
            orderId = checkoutSessionWithOrderMetaData.metadata.id

            await PaymentDA.startFulfillment(orderId)
            
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
    apiVersion: process.env.STRIPE_API_VERSION || '2022-11-15'
})

export default stripeService;