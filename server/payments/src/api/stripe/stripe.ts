import { OrderWithDetails } from "@cd/data-access";
import Stripe from "stripe";
import { calculatePlatformFeeForTransaction } from "util/transaction";

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
        const session = await this.stripe.checkout.sessions.create({
        mode: 'payment',
        
        payment_intent_data: {
            application_fee_amount: calculatePlatformFeeForTransaction(123),
            transfer_data: {
                destination: dispensaryStripeAccountId
            },
        },

        line_items: generateCheckoutLineItemsFromOrderItems(order.items),
        
        success_url: process.env.NEXT_PUBLIC_SHOP_APP_CHECKOUT_SUCCESS_URL,
        cancel_url: `${process.env.NEXT_PUBLIC_SHOP_APP_URL}/checkout`,
        });
    }

    /**
     * INCOMPLETE!! Create a stripe charge for a customer purchase
     * @param buyer
     * @param seller
     * @param transaction
     */
    async chargeCustomerPurchase() {
        try {
            // const { values, customerId, amount, tax, items, subtotal } = req.body

        // const {
        //   cardCVC,
        //   cardNumber,
        //   cardYear,
        //   cardMonth,
        //   cardHolderName,
        //   checkCard,
        //   card,
        //   address,
        //   date,
        //   time,
        //   paymentType,
        // } = values;

        // const user = await User.findById(req.user);

        // const orderData = {
        //   tax,
        //   items,
        //   paymentType,
        //   total: amount,
        //   customerId: user._id,
        //   preTaxTotal: subTotal,
        //   expectedDeliveryDate: date,
        //   expectedDeliveryTime: time,
        //   shipping: {
        //     email: user.email,
        //     name: address.name,
        //     city: address.city,
        //     phone: address.phone,
        //     postalCode: address.zip,
        //     country: address.country,
        //     address: address.street1 + address.street2,
        //   },
        // };

        // if (paymentType === "card") {
        //     let charged: Stripe.Response<Stripe.Charge>;
        //     if (!checkCard && cardCVC && cardNumber && cardYear && cardMonth && cardHolderName) {
        //       const cardToken = await createCardToken({
        //         cardHolderName,
        //         cardNumber,
        //         cardMonth,
        //         cardYear,
        //         cardCVC,
        //         address,
        //       });
  
        //       if (values.cardSaved) {
        //         const card = await stripe.customers.createSource(customerId, { source: cardToken.id });
        //         charged = await createCharge({ amount, source: card.id, customer: customerId });
        //       } else {
        //         const card = await stripe.customers.createSource(customerId, { source: cardToken.id });
        //         charged = await createCharge({ amount, source: card.id, customer: customerId });
        //         await stripe.customers.deleteSource(customerId, card.id);
        //       }
        //     }
  
        //     if (card && checkCard) {
        //       charged = await createCharge({ amount, source: card.cardId, customer: customerId });
        //     }


        // Research the multimarketplace approach to stripe connect, and continue writing these funcs
            // const charge = await this.stripe.charges.create(stripeAccountId);
            // return charge
            return {}
        } catch (error: any) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }

    /**
     * Get stripe connected account details using accountId
     * @param stripeAccountId string
     */
    async getAccount(stripeAccountId: string) {
        try {
            const account = await this.stripe.accounts.retrieve(stripeAccountId);
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
            if (!accountParams) throw new Error('Dispensary Stripe Account Params are required!');
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
            if (!params || !params.account) throw new Error('Dispensary Stripe Account Link Params are required!');
            const accountLink = await this.stripe.accountLinks.create(params);
            return accountLink;
        } catch (error: any) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }
}

export default new StripeService(process.env.STRIPE_API_KEY, {
    apiVersion: process.env.STRIPE_API_VERSION || '2022-11-15'
})

/**
 * format order Items list into stripe line items list
 * @param items 
 * @returns array of stripe line item objects
 */
function generateCheckoutLineItemsFromOrderItems(items:OrderWithDetails['items']) {
    return items.map(item => {
        return {
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }
    })
}