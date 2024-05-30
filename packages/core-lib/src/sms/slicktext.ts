/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable @typescript-eslint/naming-convention */
import { type DailyDeal } from '@cd/data-access';
import { type Customer } from '@cd/data-access';
import axios from 'axios';

const auth = Buffer.from(
	`${process.env.NEXT_PUBLIC_SLICKTEXT_PUBLIC_KEY}:${process.env.NEXT_PUBLIC_SLICKTEXT_PRIVATE_KEY}`,
).toString('base64');

class SlickTextSMS {
	async send(phoneTo: string, data: string) {
		try {
			console.trace({ phoneTo, data });
			await axios.post(
				`${process.env.NEXT_PUBLIC_SLICKTEXT_API_URL}/messages/`,
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

	async sendToList({
		textword,
		segment,
		message,
	}: {
		textword: string;
		segment: string;
		message: DailyDeal;
	}) {
		try {
			console.trace({ textword, segment, message });
			await axios.post(
				`${process.env.NEXT_PUBLIC_SLICKTEXT_API_URL}/messages/`,
				{
					action: 'SEND',
					textword,
					segment,
					body: message.message,
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
			throw error;
		}
	}

	async optInCustomer(data: CustomerSMSInvite) {
		try {
			console.info(
				`opt in customer to daily deals with slick text, phone: ${data.phone}`,
				{ data },
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
					dispensary: data.teamSlug,
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
			throw error;
		}
	}

	// async createDispensaryTextword(textword: string) {
	// 	try {
	// 		console.info(
	// 			`opt in customer to daily deals with slick text, phone: ${data.phone}, data: `,
	// 			data,
	// 		);

	// 		await axios.post(
	// 			`${process.env.NEXT_PUBLIC_SLICKTEXT_API_URL}/contacts`,
	// 			{
	// 				action: 'DOUBLEOPTIN',
	// 				textword: '4034501',
	// 				doubleOptInMessage: data.doubleOptInMessage,
	// 				number: data.phone,
	// 				firstName: data.firstName,
	// 				lastName: data.lastName,
	// 				email: data.email,
	// 				city: data.city,
	// 				state: data.state,
	// 				zipCode: data.zipcode,
	// 				birthdate: data.birthdate,
	// 				country: 'US',
	// 			},
	// 			{
	// 				headers: {
	// 					Authorization: `Basic ${auth}`,
	// 					'Content-type': 'application/x-www-form-urlencoded',
	// 				},
	// 			},
	// 		);
	// 	} catch (error) {
	// 		console.error(
	// 			'slicktext.createDispensaryTextword: ',
	// 			error.response.data,
	// 		);
	// 	}
	// }
}

export default new SlickTextSMS();

export type CustomerSMSInvite = Customer;
