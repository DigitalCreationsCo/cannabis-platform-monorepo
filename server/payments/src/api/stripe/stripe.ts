import Stripe from "stripe";

class StripeService {
    stripe: Stripe;
    constructor(apiKey, config) {
        this.stripe = new Stripe(apiKey, config);
    }

    // INCOMPLETE
    async chargeBuyerPurchase(buyer, seller, transaction) {
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

            const charge = await this.stripe.charges.create(stripeAccountId);
            return charge
        } catch (error) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }

    async getAccount(stripeAccountId: string) {
        try {
            const account = await this.stripe.accounts.retrieve(stripeAccountId);
            return account
        } catch (error) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }

    async authorizeDispensaryAccount(accountParams: Stripe.CustomerCreateParams) {
        try {
            if (!accountParams) throw new Error('Dispensary Stripe Account Params are required!');
            const account = await this.stripe.accounts.create(accountParams);
            return account;
        } catch (error) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }

    async createDispensaryAccountLink(params: Stripe.AccountLinkCreateParams) {
        try {
            if (!params || !params.account) throw new Error('Dispensary Stripe Account Link Params are required!');
            const accountLink = await this.stripe.accountLinks.create(params);
            return accountLink;
        } catch (error) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }
}

export default new StripeService(process.env.STRIPE_API_KEY, {
    apiVersion: process.env.STRIPE_API_VERSION || '2022-11-15'
})