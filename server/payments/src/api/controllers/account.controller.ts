import { OrganizationStripePayload, updateOrganizationRecord, updateStripeAccountDispensary } from '@cd/data-access';
import { Response } from 'express';
import Stripe from 'stripe';
import StripeService from '../stripe';
/* =================================
AccountController - controller class for preworking data and calling stripe accounts functions

members:
authorizeDispensaryAccount
checkOnboardDispensaryAccount

================================= */
export default class AccountController {

    /**
     * Connects a stripe account to a dispensary account
     * @param req 
     * @param res 
     */
    static async createStripeDispensaryAccount(req, res: Response) {
        try {

            let { organization: dispensaryAccount }: OrganizationStripePayload = req.body;

            if (dispensaryAccount === undefined)
            throw new Error('Dispensary is not found.')
            
            let 
            accountParams: Stripe.AccountCreateParams = {
                type: 'standard',
                country: dispensaryAccount.address.countryCode || undefined,
                email: dispensaryAccount.email || undefined,
                business_type: 'company', 
                // business_profile: {
                //     product_description: dispensaryAccount.description || '',
                //     support_phone: dispensaryAccount.phone || undefined,
                //     url: dispensaryAccount.website || '',
                // },
                // external_account: ,
                // tos_acceptance: {
                //     date: Date.now(),
                //     ip: req.ip
                // },
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
                // capabilities: {
                //     card_payments: {requested: true},
                //     transfers: {requested: true},
                // },
                // payoutsEnabled: true
            };

            const account = await StripeService.createDispensaryAccount(accountParams)

            console.log('stripe account created: ', account.id);

            if (!account) 
            throw new Error('Stripe account is not created. Please try again.');
            
            let 
            stripeAccountId = account.id;

            // adds stripe account id to organization record
            await updateStripeAccountDispensary(dispensaryAccount.id, stripeAccountId)

            const accountLink = await StripeService.createDispensaryAccountLink({
                account: stripeAccountId,
                refresh_url: process.env.NEXT_PUBLIC_SHOP_APP_URL + '/signup/create-dispensary-account',
                // return_url: 'app.' + process.env.SHOP_APP_URL,
                return_url: process.env.NEXT_PUBLIC_SHOP_APP_URL + '/signup/create-dispensary-account#step=5',
                type: 'account_onboarding'
            });

            // show confirmation of successful stripe connect, for connect or create account flows.
            // redirect dispensary user back to complete the signup, and review their info.
            
            return res.status(302).send({ 
                success: true, 
                message: 'Stripe account created successfully.',
                stripeAccountId,
                redirect: accountLink.url })
            
        } catch (error: any) {
            console.log('stripe account create error: ', error);
            
            if (error.mesage === 'Dispensary is not found.')
            return res.status(404).json({ 
                error,
                success: false, 
                stripeAccountId: null,
            });
            
            res.status(500).json({ error });
        }
    }

    /**
     * Create a stripe account, and save the id to a dispensary record (Organization)
     * 
     */
    static async connectStripeToDispensaryAccount(req, res: Response) {
        try {
            let {
                organization: dispensaryAccount, 
                stripeAccountId }: OrganizationStripePayload = req.body;

            if (dispensaryAccount === undefined)
            throw new Error('Dispensary is not found.')

            if (stripeAccountId === undefined)
            throw new Error('Stripe Id is not provided.')

            const stripeOnboardingComplete = await StripeService.checkOnboardAccount(stripeAccountId);

            if (stripeOnboardingComplete) {
                await updateOrganizationRecord(dispensaryAccount.id, {
                    stripeOnboardingComplete,
                    stripeAccountId
                })

                return res.status(200).send({
                    success: true, 
                    message: 'Your stripe account is connected!',
                    stripeAccountId 
                })
            }
            else 
            if (!stripeOnboardingComplete) {

                const accountLink = await StripeService.createDispensaryAccountLink({
                    account: stripeAccountId,
                    refresh_url: process.env.NEXT_PUBLIC_SHOP_APP_URL + '/signup/create-dispensary-account',
                    return_url: process.env.NEXT_PUBLIC_SHOP_APP_URL,
                    type: 'account_onboarding'
                });
                
                return res.status(302).send({ 
                    success: true, 
                    message: 'We noticed your stripe account is not complete. Please complete your account setup. You can return to Gras afterward.',
                    stripeAccountId,
                    redirect: accountLink.url 
                })
            }
        } catch (error: any) {
            console.error('stripe account connect error: ', error);
            
            if (error.mesage === 'Dispensary is not found.')
            return res.status(404).json({ 
                error,
                success: false, 
                stripeAccountId: null,
            });

            if (error.mesage === 'Stripe account is not found.')
            return res.status(404).json({ 
                error,
                success: false, 
                stripeAccountId: null,
            });
            
            res.status(500).json({ error });
        }
    }

    /**
     * Retrieve the user's Stripe account and check if they have finished onboarding
     * @param req 
     * @param res 
     * @returns 
     */
    static async checkOnboardStripeDispensaryAccount (req, res: Response) {
        try {
            let {id, stripeAccountId} = req.body;
            
            const stripeOnboardingComplete = await StripeService.checkOnboardAccount(stripeAccountId);

            if (stripeOnboardingComplete) {
                await updateOrganizationRecord(id, {
                    stripeOnboardingComplete,
                    stripeAccountId
                })

                return res.status(200).send({
                    success: true, 
                    message: 'Your stripe account is connected!',
                    stripeAccountId })
            }
            else 
            if (!stripeOnboardingComplete) {

                const accountLink = await StripeService.createDispensaryAccountLink({
                    account: stripeAccountId,
                    refresh_url: process.env.NEXT_PUBLIC_SHOP_APP_URL + '/signup/create-dispensary-account',
                    return_url: process.env.NEXT_PUBLIC_SHOP_APP_URL,
                    type: 'account_onboarding'
                });
                
                return res.status(302).send({ 
                    success: true, 
                    message: 'We noticed your stripe account is not complete. Please complete your account setup. You can return to Gras afterward.',
                    stripeAccountId,
                    redirect: accountLink.url })
            }
          } catch (error: any) {

            if (error.mesage === 'Stripe account is not found.')
            return res.status(404).json({ 
                error,
                success: false, 
                stripeAccountId: null,
            });
            
            console.log('Failed to retrieve Stripe account information.');
            res.status(500).json({ error });
          }
    }
}
