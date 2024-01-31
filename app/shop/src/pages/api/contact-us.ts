import { applicationHeaders, urlBuilder } from '@cd/core-lib';
import { type DailyStoryData } from '@cd/core-lib/lib/DailyStory.api';
import axios from 'axios';
import nc from 'next-connect';
import { type ContactUsFormResponse } from 'components/landing-page/ContactUs';

const handler = nc();
handler.post(async (req: any, res: any) => {
	try {
		const CONTACT_US_EMAIL_ID = '55062';

		const {
			firstName,
			lastName,
			email,
			title,
			company,
			phone,
			city,
			state,
			zipcode,
			howDidYouHearAboutUs,
			message,
		}: ContactUsFormResponse = req.body;

		const response = await axios
			.post<DailyStoryData>(
				urlBuilder.dailyStory.sendTransactionalEmail({ email }),
				{
					subject: 'Gras: new Contact Us form submission',
					from: email,
					body: `
				A partner request was submitted by ${firstName} ${lastName} at ${company}.

				Contact Information:
				${firstName} ${lastName}
				${email}
				${title}
				${company}
				${phone}
				${city}
				${state}
				${zipcode}

				How did you hear about us? ${howDidYouHearAboutUs}

				The request message:
				${message}
                
                An automated reply was sent to ${firstName} at ${email}.
                
                Send a reply to ${firstName} at ${email} to continue the conversation!


                `,
				},
				{
					headers: {
						...applicationHeaders,
						authorization: `Bearer ${process.env.DAILYSTORY_API_KEY}`,
					},
				},
			)
			.then(
				async () => {
					console.info('contact us email sent');

					return await axios.post<DailyStoryData>(
						urlBuilder.dailyStory.createOrEditLead(),
						{
							leadId: 0,
							campaignId: 16116,
							leadSource: 'Contact Us',
							leadSourceId: null,
							leadOrigin: 'Organic',
							segments: [14461],
							firstName,
							lastName,
							email,
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
				},
				(err) => {
					console.info('failed to send contact us email', err);
					throw new Error(err);
				},
			);

		if (response.data.Status !== true)
			throw new Error("Failed to send 'contact us' email");

		console.info('created contact-us lead', response.data.Response);
		return res
			.status(response.status)
			.json({ success: 'true', payload: response.data.Response });
	} catch (error: any) {
		console.error('POST api/contact-us: ', error.message);
		return res.json({ success: 'false', error: error.message });
	}
});

export default handler;
