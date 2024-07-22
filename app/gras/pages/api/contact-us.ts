import { FreshSales, slugify } from '@cd/core-lib';
import { type ContactUsFormResponse } from '@cd/ui-lib';
import { type NextApiRequest, type NextApiResponse } from 'next';

const FRESHSALES_ADMIN_USERID = 26004178205;

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		switch (req.method) {
			case 'POST':
				await handlePOST(req, res);
				break;
			default:
				res.setHeader('Allow', 'POST');
				res.status(405).json({
					error: { message: `Method ${req.method} Not Allowed` },
				});
		}
	} catch (error: any) {
		const message = error.message || 'Something went wrong';
		const status = error.status || 500;

		res.status(status).json({
			success: 'false',
			error: message,
		});
	}
}

const handlePOST = async (req: any, res: any) => {
	const {
		firstName,
		lastName,
		email: fromEmail,
		title,
		company,
		phone,
		street,
		city,
		state,
		zipcode,
		howDidYouHearAboutUs,
		subscribeCannabisInsiderNewsletter,
		serviceAreaRange,
		weeklyDeliveries,
		message,
	} = req.body as Required<ContactUsFormResponse>;

	// upsert account
	const accountId = await FreshSales.upsertAccount({
		name: company,
		address: street,
		city,
		state,
		zipcode,
		country: 'United_States',
		custom_field: {
			cf_slug: slugify(company),
			'How did you hear about us': howDidYouHearAboutUs,
			cf_service_range_in_miles: serviceAreaRange,
			cf_expected_weekly_deliveries: weeklyDeliveries,
			'Contact Us Message': message,
		},
	});

	// upsert contact
	await FreshSales.upsertContact(
		{
			first_name: firstName,
			last_name: lastName,
			job_title: title,
			email: fromEmail,
			mobile_number: phone,
			work_number: phone,
			address: street,
			city,
			state,
			zipcode,
			country: 'United_States',
			medium: 'contact-us-form',
			keyword: 'growth',
			custom_field: {
				company: company,
			},
		},
		{
			sales_accounts: [{ id: accountId, is_primary: true }],
			owner_id: FRESHSALES_ADMIN_USERID,
			lead_source_id: undefined,
			subscription_types: `${subscribeCannabisInsiderNewsletter ? 4 : 0};1;2;3;`,
			keyword: 'dispensary lead',
		}
	);

	// Internal emails and customer journeys are handled in crm workflows

	return res.status(201).json({ success: 'true' });
};
