import {
	TextContent,
	urlBuilder,
	type DispensaryConnectStripeAccountPayload,
	type DispensaryCreateStripeAccountPayload,
	type OrganizationStripeDetail,
} from '@cd/core-lib';
import { updateDispensaryStripeAccount } from '@cd/data-access';
import type Stripe from 'stripe';
import StripeService from '../stripe';

/* =================================
AccountController - controller class for preworking data and calling stripe accounts functions

members:
authorizeDispensaryAccount
checkOnboardDispensaryAccount

================================= */
export default class AccountController {
	/**
	 * Create a stripe account, and save the id to a dispensary record (Organization)
	 * @param req
	 * @param res
	 */
	static async createStripeDispensaryAccount(req, res) {
		try {
			console.log('create Stripe Dispensary Account, ', req.body);
			const {
				organization: dispensaryAccount,
				email,
			}: DispensaryCreateStripeAccountPayload = req.body;
			if (dispensaryAccount === undefined)
				throw new Error(TextContent.error.DISPENSARY_NOT_FOUND);
			const accountParams: Stripe.AccountCreateParams = {
				type: 'standard',
				country: dispensaryAccount.address.countryCode || undefined,
				email: email,
				business_type: 'company',
				company: {
					name: dispensaryAccount.name || undefined,
					address: {
						line1: dispensaryAccount.address.street1 || undefined,
						line2: dispensaryAccount.address.street2 || undefined,
						city: dispensaryAccount.address.city || undefined,
						state: dispensaryAccount.address.state || undefined,
						postal_code:
							dispensaryAccount.address.zipcode.toString() || undefined,
						country: dispensaryAccount.address.countryCode || undefined,
					},
					phone: dispensaryAccount.phone || undefined,
				},
			};
			const account = await StripeService.createDispensaryAccount(
				accountParams,
			);
			if (!account)
				throw new Error(TextContent.error.STRIPE_ACCOUNT_CREATE_FAILED);
			console.debug('stripe Dispensary account created: ', account);
			const stripeAccountId = account.id;
			await updateDispensaryStripeAccount(
				dispensaryAccount.id,
				stripeAccountId,
			);
			return res.status(201).json({
				success: 'true',
				message: 'Stripe account created successfully.',
				payload: { stripeAccountId },
			});
		} catch (error: any) {
			console.error('API Error: stripe account create error: ', error);
			if (error.mesage === TextContent.error.DISPENSARY_NOT_FOUND)
				return res.status(404).json({
					success: 'false',
					error: error.message,
				});
			return res.status(500).json({ success: 'false', error: error.message });
		}
	}

	/**
	 * Connects a stripe account to a dispensary account
	 * @param req
	 * @param res
	 */
	static async connectStripeDispensaryAccount(req, res) {
		try {
			const {
				organization: dispensaryAccount,
				stripeAccountId,
			}: DispensaryConnectStripeAccountPayload = req.body;
			if (dispensaryAccount === undefined)
				throw new Error(TextContent.error.DISPENSARY_NOT_FOUND);
			if (stripeAccountId === undefined)
				throw new Error('stripe ID is not provided.');
			// check if stripe account is ready for processing
			const stripeOnboardingComplete = await StripeService.checkOnboardAccount(
				stripeAccountId,
			);
			if (stripeOnboardingComplete) {
				await updateDispensaryStripeAccount(
					dispensaryAccount.id,
					stripeAccountId,
					{
						stripeOnboardingComplete: true,
					},
				);
				console.debug(
					'stripe account is ready for processing. the Dispensary record is updated.',
				);
				return res.status(200).json({
					success: 'true',
					message: 'Your stripe account is connected!',
					payload: { stripeAccountId },
				});
			} else if (!stripeOnboardingComplete) {
				const accountLink = await StripeService.createDispensaryAccountLink({
					account: stripeAccountId,
					refresh_url: `${urlBuilder.dashboardDispensarySignUpUrl}`,
					return_url: `${urlBuilder.dashboard}#step=5`,
					type: 'account_onboarding',
				});
				console.debug(
					'stripe account is not ready. The user will be redirected to stripe.',
				);
				return res.status(302).json({
					success: 'true',
					message:
						'We noticed your stripe account is not complete. Please complete your account setup. You can return to Gras afterward.',
					payload: { stripeAccountId },
					redirect: accountLink.url,
				});
			}
		} catch (error: any) {
			console.error('API Error: stripe account connect error: ', error);
			if (error.mesage === TextContent.error.DISPENSARY_NOT_FOUND)
				return res.status(404).json({
					success: 'false',
					error: error.message,
				});
			if (
				error.mesage === TextContent.error.STRIPE_ACCOUNT_NOT_FOUND ||
				error.message.startsWith('The provided key ')
			)
				return res.status(404).json({
					success: 'false',
					error: TextContent.error.STRIPE_ACCOUNT_NOT_FOUND,
				});
			return res.status(500).json({ success: 'false', error: error.message });
		}
	}

	/**
	 * Retrieve the user's Stripe account and check if they have finished onboarding
	 * @param req
	 * @param res
	 * @returns
	 */
	static async checkOnboardStripeDispensaryAccount(req, res) {
		try {
			const { id, stripeAccountId }: OrganizationStripeDetail = req.body;
			const stripeOnboardingComplete = await StripeService.checkOnboardAccount(
				stripeAccountId,
			);
			if (stripeOnboardingComplete) {
				await updateDispensaryStripeAccount(id, stripeAccountId, {
					stripeOnboardingComplete: true,
				});
				console.debug(
					'stripe account is ready for processing. the Dispensary record is updated.',
				);
				return res.status(200).json({
					success: 'true',
					message: 'Your stripe account is connected!',
					payload: { stripeAccountId },
				});
			} else if (!stripeOnboardingComplete) {
				const accountLink = await StripeService.createDispensaryAccountLink({
					account: stripeAccountId,
					refresh_url: `${urlBuilder.dashboardDispensarySignUpUrl}`,
					return_url: `${urlBuilder.dashboard}`,
					type: 'account_onboarding',
				});
				console.debug(
					'stripe account is not ready. The user will be redirected to stripe.',
				);
				return res.status(302).json({
					success: 'true',
					message:
						'We noticed your stripe account is not complete. Please complete your account setup. You can return to Gras afterward.',
					payload: { stripeAccountId },
					redirect: accountLink.url,
				});
			}
		} catch (error: any) {
			console.error('API Error: stripe account checkOnboard error: ', error);
			if (error.mesage === TextContent.error.STRIPE_ACCOUNT_NOT_FOUND)
				return res.status(404).json({
					success: 'false',
					error: error.message,
				});
			return res.status(500).json({ success: 'false', error: error.message });
		}
	}
}
