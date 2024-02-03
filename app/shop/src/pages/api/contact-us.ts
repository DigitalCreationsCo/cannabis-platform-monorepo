import { applicationHeaders, urlBuilder } from '@cd/core-lib';
import { type DailyStoryData } from '@cd/core-lib/lib/DailyStory.api';
import axios from 'axios';
import nc from 'next-connect';
import { type ContactUsFormResponse } from 'components/landing-page/ContactUs';

const EMAIL_ID_INTERNAL_CONTACT_US_NOTICE = '55062';

const handler = nc();
handler.post(async (req: any, res: any) => {
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
			message,
		}: ContactUsFormResponse = req.body;

		// create a contact with tag 'contact us', 'dispensary lead'
		// set automations for the tags
		// send an email to Gras with the contact information
		// send an email to the contact with information about Gras

		const response = await axios.post<DailyStoryData>(
			urlBuilder.dailyStory.createOrEditLead(),
			{
				leadId: 0,
				campaignId: 16116,
				leadSource: 'contact-us',
				leadSourceId: null,
				leadOrigin: 'Organic',
				segments: [14461],
				firstName,
				lastName,
				email: fromEmail,
				title,
				company,
				phone,
				mobilePhone: phone,
				city,
				region: state,
				postalCode: zipcode,
				howDidYouHearAboutUs,
				message,
			},
			{
				headers: {
					...applicationHeaders,
					authorization: `Bearer ${process.env.DAILYSTORY_API_KEY}`,
				},
			},
		);

		if (response.data.Status !== true)
			throw new Error("Failed to send 'contact us' email");
		console.info('created contact-us lead', response.data.Response);

		console.info('body: ', JSON.stringify(req.body, null, 2));
		// send the form submission to Gras via email
		await axios
			.post<DailyStoryData>(
				urlBuilder.dailyStory.sendEmail({
					id: EMAIL_ID_INTERNAL_CONTACT_US_NOTICE,
					email: 'leads@grascannabis.org',
				}),
				{
					firstName,
					lastName,
					fromEmail,
					title,
					company,
					phone,
					city,
					state,
					zipcode,
					howDidYouHearAboutUs,
					message,
					plaintext: JSON.stringify(`
				A partner request was submitted by ${firstName} ${lastName} at ${company}.

				Contact Information:
				${firstName} ${lastName}
				${fromEmail}
				${title}
				${company}
				${phone}
				${city}
				${state}
				${zipcode}

				How did you hear about us? ${howDidYouHearAboutUs}

				The request message:
				${message}

		        An automated email has been sent to ${firstName} at ${fromEmail}.

		        Send a new email to ${fromEmail} to continue the conversation!
		        `),
				},
				{
					headers: {
						...applicationHeaders,
						authorization: `Bearer ${process.env.DAILYSTORY_API_KEY}`,
					},
				},
			)
			.then((response) => {
				console.info('contact us email sent');
				console.info('response', response.data.Response);
			});
		return res
			.status(response.status)
			.json({ success: 'true', payload: response.data.Response });
	} catch (error: any) {
		console.error('POST api/contact-us: ', error);
		return res.json({ success: 'false', error: error.message });
	}
});

export default handler;
