import { FreshSales } from '@gras/core/crm';
import { leadSourceIds } from '@gras/core/crm/freshsales';
import { prependDialCode, slugify } from '@gras/core/utils';
import { type ContactUsFormResponse } from '@gras/ui';
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

/*
 * Save Contact and Account in FreshSales
 * Internal emails and customer journeys are handled in crm workflows
 */
const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {
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
		whichServiceInterestedIn,
		howDidYouHearAboutUs,
		subscribeCannabisInsiderNewsletter,
		serviceAreaRange,
		weeklyDeliveries,
		message,
		ecommerceUrl = '',
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
			cf_ecommerce_url: ecommerceUrl,
			cf_requested_service: whichServiceInterestedIn,
		},
	});

	await FreshSales.upsertContact({
		first_name: firstName,
		last_name: lastName,
		job_title: title,
		email: fromEmail,
		mobile_number: prependDialCode(phone),
		work_number: prependDialCode(phone),
		address: street,
		city,
		state,
		zipcode,
		country: 'United_States',
		custom_field: {
			company: company,
		},
		sales_accounts: [{ id: accountId, is_primary: true }],
		owner_id: FRESHSALES_ADMIN_USERID,
		subscription_types: `${subscribeCannabisInsiderNewsletter ? 4 : 0};1;2;3;`,
		lead_source_id: leadSourceIds['web-form'],
		medium: `${req.query['utm_source'] || 'direct'}`, // get from utm params
		keyword: ['lead', req.query['utm_campaign'], req.query['utm_term']].join(
			','
		),
	});

	return res.status(201).json({ success: 'true' });
};
