import env from '@/lib/env';
import { updateDispensary, type StaffMember } from '@cd/data-access';
import Stripe from 'stripe';
import { clientPromise } from './db';

export const stripe = new Stripe(env.stripe.secretKey ?? '', {
	// https://github.com/stripe/stripe-node#configuration
	// @ts-ignore
	apiVersion: env.stripe.apiVersion,
});

export async function getStripeCustomerId(
	teamMember: StaffMember,
	session?: any
) {
	const client = await clientPromise;
	let customerId = '';
	if (!teamMember.team.billingId) {
		const customerData: {
			metadata: { teamId: string };
			email?: string;
		} = {
			metadata: {
				teamId: teamMember.teamId,
			},
		};
		if (session?.user?.email) {
			customerData.email = session?.user?.email;
		}
		const customer = await stripe.customers.create({
			...customerData,
			name: session?.user?.name as string,
		});
		await updateDispensary({
			client,
			data: {
				slug: teamMember.team.slug,
				billingId: customer.id,
				billingProvider: 'stripe',
			},
		});
		customerId = customer.id;
	} else {
		customerId = teamMember.team.billingId;
	}
	return customerId;
}
