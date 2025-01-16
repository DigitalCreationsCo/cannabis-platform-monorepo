import { type User, updateUser } from '@gras/data-access';
import Stripe from 'stripe';
import env from '@/lib/env';
import { clientPromise } from './db';

export const stripe = new Stripe(env.stripe.secretKey ?? '', {
	// https://github.com/stripe/stripe-node#configuration
	// @ts-ignore
	apiVersion: env.stripe.apiVersion,
});

export async function getStripeCustomerId(user: User, session?: any) {
	const client = await clientPromise;
	let customerId = '';
	if (!user.billingId) {
		const customerData: {
			metadata: { userId: string; name: string; email?: string };
			email?: string;
		} = {
			metadata: {
				userId: user.id,
				name: user.name,
				email: user.email,
			},
			email: user.email,
		};
		if (session?.user?.email) {
			customerData.email = session?.user?.email;
		}
		const customer = await stripe.customers.create({
			...customerData,
			name: session?.user?.name as string,
		});
		await updateUser({
			client,
			where: { id: user.id },
			data: {
				billingId: customer.id,
				billingProvider: 'stripe',
			},
		});
		customerId = customer.id;
	} else {
		customerId = user.billingId;
	}
	return customerId;
}
