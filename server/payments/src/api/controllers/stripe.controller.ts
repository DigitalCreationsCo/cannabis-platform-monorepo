import { OrganizationCreateType } from '@cd/data-access';
import StripeService from '../stripe';

/* =================================
StripeController - controller class for stripe accounts actions

members:
authorizeAccount

================================= */
export default class StripeController {
    static async authorizeDispensaryAccount(req, res) {
        let account:OrganizationCreateType & {stripeAccountId: string} = req.body;
        
        try {
            let accountId = account.stripeAccountId;
            if (accountId == undefined) {
                let accountParams = {
                    type: 'express',
                    country: account.address.countryCode || undefined,
                    email: account.email || undefined,
                    business_type: 'company', 
                    company: {
                        name: account.name || undefined,
                        address:{
                            line1: account.address.street1 || undefined,
                            line2: account.address.street2 || undefined,
                            city: account.address.city || undefined,
                            state: account.address.state || undefined,
                            postal_code: account.address.zipcode || undefined,
                            country: account.address.countryCode || undefined
                        },
                        phone: account.phone || undefined,
                    },
                    capabilities: {
                        card_payments: {requested: true},
                    },
                    payoutsEnabled: true
                }


      const account = await stripe.accounts.create(accountParams);
      accountId = account.id;

      // Update the model and store the Stripe account ID in the datastore:
      // this Stripe account ID will be used to issue payouts to the pilot
      req.user.stripeAccountId = accountId;
      await req.user.save();
    }

            const response = await StripeService.authorizeDispensaryAccount(req, res);
            return res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ error });
        }
    }
}
