import Stripe from "stripe";

class StripeService {
    stripe: Stripe;
    constructor(apiKey, config) {
        this.stripe = new Stripe(apiKey, config);
    }
    // async authorizeDispensaryAccount(req, res) {
    //     try {
    //     const query = req.query
    //         const response = await this.stripe.oauth.token({
    //             grant_type: 'authorization_code',
    //             code: query.code
    //         })
    //         console.log(response.stripe_user_id)
    //         res.redirect("customURLTORedirect")
    //     } catch (error) {
    //         console.log(error)
    //         res.redirect("customURLTORedirect")
    //     }
    // }
    async authorizeDispensaryAccount(accountParams: Stripe.CustomerCreateParams) {
        try {
            if (!accountParams) throw new Error('Dispensary Account Params are required!');
            const account = await this.stripe.accounts.create(accountParams);
            return account;
        } catch (error) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }
}

export default new StripeService(process.env.STRIPE_API_KEY, {
    apiVersion: process.env.STRIPE_API_VERSION || '2022-11-15'
})