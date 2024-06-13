/* eslint-disable @typescript-eslint/naming-convention */
import { FreshSales, applicationHeaders, urlBuilder } from '@cd/core-lib';
import { FreshSalesContactParameters } from '@cd/core-lib/src/crm/freshsales';
import { Customer } from '@cd/data-access';
import axios from 'axios';
import { type NextApiRequest, type NextApiResponse } from 'next';
import { type ContactUsFormResponse } from '@/components/landing/workwithus/ContactUs';

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
    city,
    state,
    zipcode,
    howDidYouHearAboutUs,
    subscribeCannabisInsiderNewsletter,
    serviceAreaRange,
    weeklyDeliveries,
    message,
  }: ContactUsFormResponse = req.body;

  // upsert account
  const account = await axios.post<{ sales_account: { id: number } }>(
    `${urlBuilder.freshSales.baseUrl}/api/sales_accounts/upsert`,
    {
      unique_identifier: { name: company },
      sales_account: {
        name: company,
        address: null,
        city,
        state,
        zipcode,
        country: 'United_States',
      },
    },
    {
      headers: {
        ...applicationHeaders,
        authorization: `Token token=${process.env.FRESHSALES_API_KEY}`,
      },
    }
  );
  console.info('account', account.data);

  // TO DO: Mar 30 2024
  // create a contact with tag 'contact us', 'dispensary lead'
  // set automations for the tags
  // send an email to Gras with the contact information
  // send an email to the contact with information about Gras

  await FreshSales.createContact({
    first_name: firstName,
    last_name: lastName,
    job_title: title,
    emails: [{ email: fromEmail }],
    mobile_number: phone,
    work_number: phone,
    city,
    state,
    zipcode,
    country: 'United_States',
    sales_accounts: [{ id: account.data.sales_account.id }],
    lead_source_id: null,
    owner_id: FRESHSALES_ADMIN_USERID,
    subscription_status: [1],
    subscription_types: `${subscribeCannabisInsiderNewsletter ? 4 : 0};1;2;3;`,
    medium: 'contact-us-form',
    keyword: 'growth',
    custom_field: {
      company: company,
      'How did you hear about us': howDidYouHearAboutUs,
      'Service Area Range': serviceAreaRange,
      'Weekly Deliveries': weeklyDeliveries,
      'Contact Us Message': message,
    },
  });

  // Internal and customer journeys are handled via crm workflows

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
  return res.status(201).json({ success: 'true' });
  // } catch (error: any) {
  //   console.error('POST api/contact-us: ', error.message);
  //   console.error('POST api/contact-us: ', error.response.data);
  //   return res.json({
  //     success: 'false',
  //     error: error.response?.data?.errors?.message[0] || error.message,
  //   });
  // }
};
