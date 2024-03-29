/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable sonarjs/no-small-switch */
import { applicationHeaders, urlBuilder } from '@cd/core-lib';
import axios from 'axios';
import { type NextApiRequest, type NextApiResponse } from 'next';
import { type ContactUsFormResponse } from 'components/landing-page/ContactUs';

const EMAIL_ID_INTERNAL_CONTACT_US_NOTICE = '55062';
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
			city,
			state,
			zipcode,
			howDidYouHearAboutUs,
			serviceAreaRange,
			weeklyDeliveries,
			message,
		}: ContactUsFormResponse = req.body;

		// create a contact with tag 'contact us', 'dispensary lead'
		// set automations for the tags
		// send an email to Gras with the contact information
		// send an email to the contact with information about Gras

		const response = await axios.post<any>(
			urlBuilder.freshSales.createContact(),
			{
				contact: {
					first_name: firstName,
					last_name: lastName,
					job_title: title,
					email: fromEmail,
					segments: [14461],
					company,
					mobile_number: phone,
					work_number: phone,
					city,
					state,
					zipcode,
					country: 'United_States',
					sales_accounts: [company],
					lead_source_id: null,
					owner_id: FRESHSALES_ADMIN_USERID,
					subscription_status: 'Subscribed',
					subscription_types: [
						'CANNABIS INSIDER | commerce, news, progress',
						'Non-marketing emails from our company',
					],
					medium: 'contact-us-form',
					keyword: 'growth',
					custom_field: {
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
					authorization: `Bearer ${process.env.FRESHSALES_API_KEY}`,
				},
			},
		);

		if (response.status > 299) throw new Error('Failed to send the message.');

		console.info('contact-us submit response', response.data);

		// console.info('body: ', JSON.stringify(req.body, null, 2));
		// // send the form submission to Gras via email
		// await axios
		// 	.post<any>(
		// 		urlBuilder.dailyStory.sendEmail({
		// 			id: EMAIL_ID_INTERNAL_CONTACT_US_NOTICE,
		// 			email: 'leads@grascannabis.org',
		// 		}),
		// 		{
		// 			firstName,
		// 			lastName,
		// 			fromEmail,
		// 			title,
		// 			company,
		// 			phone,
		// 			city,
		// 			state,
		// 			zipcode,
		// 			howDidYouHearAboutUs,
		// 			serviceAreaRange,
		// 			weeklyDeliveries,
		// 			message,
		// 			plaintext: JSON.stringify(`
		// 		A partner request was submitted by ${firstName} ${lastName} at ${company}.

		// 		Contact Information:
		// 		${firstName} ${lastName}
		// 		${fromEmail}
		// 		${title}
		// 		${company}
		// 		${phone}
		// 		${city}
		// 		${state}
		// 		${zipcode}
		// 		How many miles from your store do you want to deliver? ${serviceAreaRange}
		// 		How many orders do you expect to deliver per week? ${weeklyDeliveries}
		// 		How did you hear about us? ${howDidYouHearAboutUs}

		// 		The request message:
		// 		${message}

		//         A sign-up link has been sent to ${firstName} at ${fromEmail}.

		//         Send a new email to ${fromEmail} to continue the conversation!
		//         `),
		// 		},
		// 		{
		// 			headers: {
		// 				...applicationHeaders,
		// 				authorization: `Bearer ${process.env.DAILYSTORY_API_KEY}`,
		// 			},
		// 		},
		// 	)
		// 	.then((response) => {
		// 		console.info('contact us email sent');
		// 		console.info('response', response.data.Response);
		// 	});
		return res
			.status(response.status)
			.json({ success: 'true', payload: response.data.Response });
	} catch (error: any) {
		console.error('POST api/contact-us: ', error);
		return res.json({ success: 'false', error: error.message });
	}
};
