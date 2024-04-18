/* eslint-disable @typescript-eslint/naming-convention */
import { type USStateAbbreviated } from '@cd/data-access';
import axios from 'axios';

const auth = Buffer.from(
	`${process.env.NEXT_PUBLIC_SLICKTEXT_PUBLIC_KEY}:${process.env.NEXT_PUBLIC_SLICKTEXT_PRIVATE_KEY}`,
).toString('base64');

class SlickTextSMS {
	async send(phoneTo: string, data: string) {
		try {
			console.info(
				`sending slick text sms message to ${phoneTo} with data: `,
				data,
			);

			await axios.post(
				process.env.NEXT_PUBLIC_SLICKTEXT_API_URL as string,
				{
					body: data,
				},
				{
					headers: {
						Authorization: `Basic ${auth}`,
						'Content-type': 'application/x-www-form-urlencoded',
					},
				},
			);
		} catch (error) {
			console.error('slicktext.send: ', error);
		}
	}

	async optInCustomer(data: CustomerSMSInvite) {
		try {
			console.info(
				`opt in customer to daily deals with slick text, phone: ${data.phone}, data: `,
				data,
			);

			await axios.post(
				`${process.env.NEXT_PUBLIC_SLICKTEXT_API_URL}/contacts`,
				{
					action: 'DOUBLEOPTIN',
					textword: '4034501',
					doubleOptInMessage: data.doubleOptInMessage,
					number: data.phone,
					firstName: data.firstName,
					lastName: data.lastName,
					email: data.email,
					city: data.city,
					state: data.state,
					zipCode: data.zipcode,
					birthdate: data.birthdate,
					country: 'US',
				},
				{
					headers: {
						Authorization: `Basic ${auth}`,
						'Content-type': 'application/x-www-form-urlencoded',
					},
				},
			);
		} catch (error) {
			console.error('slicktext.optincustomer: ', error.response.data);
		}
	}
}

export default new SlickTextSMS();

export type CustomerSMSInvite = {
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
	city?: string;
	state?: USStateAbbreviated;
	zipcode?: number;
	birthdate?: string;
	doubleOptInMessage: string;
};
