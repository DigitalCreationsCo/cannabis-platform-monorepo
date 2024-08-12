import env from '@/lib/env';
import {
	type StaffMemberWithDispensary,
	updateDispensary,
} from '@cd/data-access';
import Stripe from 'stripe';
import { clientPromise } from './db';
import { sendEmail } from './email/sendEmail';

export const stripe = new Stripe(env.stripe.secretKey ?? '', {
	// https://github.com/stripe/stripe-node#configuration
	// @ts-ignore
	apiVersion: env.stripe.apiVersion,
});

export async function getStripeCustomerId(
	teamMember: StaffMemberWithDispensary,
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

export async function createInvoice(customerName, customerId, priceIds) {
	try {
		// Create invoice items using the price IDs
		for (const priceId of priceIds) {
			await stripe.invoiceItems.create({
				customer: customerId,
				price: priceId,
			});
		}

		// Create the invoice
		const invoice = await stripe.invoices.create({
			customer: customerId,
			auto_advance: true, // Automatically finalize and send the invoice
		});

		// notify the team the invoice is created
		await notifyTeam({
			invoiceId: invoice.id,
			customerId,
			invoiceUrl: invoice.hosted_invoice_url ?? '',
			customerName: customerName,
		});

		console.log(`Invoice created successfully: ${invoice.id}`);
		return invoice;
	} catch (error) {
		console.error('Error creating invoice:', error);
		throw error;
	}
}

async function notifyTeam({
	invoiceId,
	customerId,
	invoiceUrl,
	customerName,
}: {
	invoiceId: string;
	customerId: string;
	invoiceUrl: string;
	customerName: string;
}) {
	try {
		const mailOptions = {
			from: process.env.NOTIFY_EMAIL_USER ?? '',
			to: process.env.TEAM_EMAIL ?? '',
			subject: 'New Invoice Created',
			text: `A new invoice (ID: ${invoiceId}) has been created for customer (${customerName}, ID: ${customerId}).
			
			You can view the invoice here: ${invoiceUrl}`,
		};

		// send the email
		await sendEmail(mailOptions);

		console.log('Team notified of new invoice:', invoiceId);
	} catch (error) {
		console.error('Error notifying team:', error);
		throw error;
	}
}
