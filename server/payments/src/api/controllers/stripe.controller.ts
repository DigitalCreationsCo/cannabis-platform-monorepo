import { OrganizationCreateType } from '@cd/data-access';
import StripeService from '../stripe';

/* =================================
StripeController - controller class for preworking data and calling stripe accounts functions

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
      const account = await StripeService.authorizeDispensaryAccount(accountParams)
      accountId = account.id;
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
