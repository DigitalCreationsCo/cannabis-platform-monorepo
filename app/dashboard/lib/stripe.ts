import { updateDispensary, type StaffMember } from '@cd/data-access';
import Stripe from 'stripe';
import env from '@/lib/env';
import { clientPromise } from './db';

export const stripe = new Stripe(env.stripe.secretKey ?? '', {
	// https://github.com/stripe/stripe-node#configuration
	apiVersion: '2024-04-10',
});

export async function getStripeCustomerId(
	teamMember: StaffMember,
	session?: any
) {
	const client = await clientPromise;

	let customerId = '';

	if (!teamMember.team.billingId) {
		// if the team doesn't have a billingId, create a new customer
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

		// create a new customer
		const customer = await stripe.customers.create({
			...customerData,
			name: session?.user?.name as string,
		});

		// update the dispensary with the new billingId
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
		// if the team already has a billingId, use it
		customerId = teamMember.team.billingId;
	}
	return customerId;
}
