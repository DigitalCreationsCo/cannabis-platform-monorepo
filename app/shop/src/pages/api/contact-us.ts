/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable sonarjs/no-small-switch */
import { applicationHeaders, urlBuilder } from '@cd/core-lib';
import axios from 'axios';
import { type NextApiRequest, type NextApiResponse } from 'next';
import { type ContactUsFormResponse } from 'components/landing-page/ContactUs';

const FRESHSALES_ADMIN_USERID = 26004178205;

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
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
	try {
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
			...customFields
		}: ContactUsFormResponse = req.body;

		// upsert account
		const account = await axios.post<{ sales_account: { id: number } }>(
			`${urlBuilder.freshSales.baseUrl}/api/sales_accounts/upsert`,
			{
				unique_identifier: { name: company },
				sales_account: {
					name: company,
					address: street,
					city,
					state,
					zipcode,
					country: 'United States',
				},
			},
			{
				headers: {
					...applicationHeaders,
					authorization: `Token token=${process.env.FRESHSALES_API_KEY}`,
				},
			},
		);
		console.info('account', account.data);

		// TO DO: Mar 30 2024
		// create a contact with tag 'contact us', 'dispensary lead'
		// set automations for the tags
		// send an email to Gras with the contact information
		// send an email to the contact with information about Gras
		const response = await axios.post<any>(
			`${urlBuilder.freshSales.baseUrl}/api/contacts/upsert`,
			{
				contact: {
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
					country: 'United States',
					sales_account: [{ id: account.data.sales_account.id }],
					lead_source_id: null,
					owner_id: FRESHSALES_ADMIN_USERID,
					subscription_status: [1],
					subscription_types: `${
						subscribeCannabisInsiderNewsletter ? 4 : 0
					};1;2;3;`,
					medium: 'contact-us-form',
					keyword: 'growth',
					custom_field: {
						cf_company: company,
						...customFields,
						'How did you hear about us': howDidYouHearAboutUs,
						'Service Area Range': serviceAreaRange,
						'Weekly Deliveries': weeklyDeliveries,
						'Contact Us Message': message,
					},
				},
			},
			{
				headers: {
					...applicationHeaders,
					authorization: `Token token=${process.env.FRESHSALES_API_KEY}`,
				},
			},
		);

		if (response.status > 299) throw new Error('Failed to send the message.');
		console.info('response', response.data);

		return res
			.status(response.status)
			.json({ success: 'true', payload: response.data.Response });
	} catch (error: any) {
		console.error('POST api/contact-us: ', error.message);
		console.error('POST api/contact-us: ', error.response.data);
		return res.json({
			success: 'false',
			error: error.response?.data?.errors?.message[0] || error.message,
		});
	}
};
