import { OrganizationCreateType, updateOrganizationRecord, updateStripeAccountDispensary } from '@cd/data-access';
import { Response } from 'express';
import StripeService from '../stripe';
/* =================================
StripeController - controller class for preworking data and calling stripe accounts functions

members:
authorizeDispensaryAccount
checkOnboardDispensaryAccount

================================= */
export default class StripeController {

    static async createDispensaryAccount(req, res: Response) {
        try {
            let dispensaryAccount:OrganizationCreateType & {stripeAccountId: string} = req.body;
            let accountId = dispensaryAccount.stripeAccountId;
            if (accountId == undefined) {
                let accountParams = {
                    type: 'standard',
                    country: dispensaryAccount.address.countryCode || undefined,
                    email: dispensaryAccount.email || undefined,
                    business_type: 'company', 
                    company: {
                        name: dispensaryAccount.name || undefined,
                        address:{
                            line1: dispensaryAccount.address.street1 || undefined,
                            line2: dispensaryAccount.address.street2 || undefined,
                            city: dispensaryAccount.address.city || undefined,
                            state: dispensaryAccount.address.state || undefined,
                            postal_code: dispensaryAccount.address.zipcode || undefined,
                            country: dispensaryAccount.address.countryCode || undefined
                        },
                        phone: dispensaryAccount.phone || undefined,
                    },
                    capabilities: {
                        card_payments: {requested: true},
                    },
                    payoutsEnabled: true
                }
                const account = await StripeService.createDispensaryAccount(accountParams)
                accountId = account.id;
                dispensaryAccount.stripeAccountId = accountId;
                await updateStripeAccountDispensary(dispensaryAccount.id, dispensaryAccount.stripeAccountId)
            }
            const accountLink = await StripeService.createDispensaryAccountLink({
                account: accountId,
                // create react account Link page for stripe
                // refresh_url: config.publicDomain + '/pilots/stripe/authorize',
                
                // redirect to dispensary dashboard
                return_url: 'app.' + process.env.SHOP_APP_URL,
                type: 'account_onboarding'
            });
            res.writeHead(302, {
                'Location': accountLink.url
            })
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    static async checkOnboardDispensaryAccount (req, res: Response) {
        try {
            // Retrieve the user's Stripe account and check if they have finished onboarding
            let {id, stripeAccountId} = req.body;
            const account = await StripeService.getAccount(stripeAccountId);
            if (account.details_submitted) {
                await updateOrganizationRecord(id, {onboardingComplete: true})
                return res.writeHead(302, {
                    'Location': '/'
                })
            } else {
              console.log('The dispensary stripe onboarding process was not completed.');
              // create react account Link page for stripe
                // refresh_url: config.publicDomain + '/pilots/stripe/authorize',
                return res.writeHead(302, {
                    'Location': '/'
                })
            }
          } catch (error) {
            console.log('Failed to retrieve Stripe account information.');
            res.status(500).json({ error });
          }
    }
}
