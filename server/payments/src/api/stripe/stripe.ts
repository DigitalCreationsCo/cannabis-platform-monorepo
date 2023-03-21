import Stripe from "stripe";

class StripeService {
    stripe: Stripe;
    constructor(apiKey, config) {
        this.stripe = new Stripe(apiKey, config);
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