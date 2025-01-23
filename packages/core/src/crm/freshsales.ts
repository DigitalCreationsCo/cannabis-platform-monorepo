/* eslint-disable @typescript-eslint/naming-convention */
import { type Customer } from '@gras/data-access';
import { applicationHeaders, axios } from '../axiosInstance';
import { slugify } from '../utils/common.util';
import { prependDialCode } from '../utils/phone.util';
import { urlBuilder } from '../utils/urlBuilder';
import { FreshSalesAccountParameters, FreshSalesAttribution, FreshSalesContactParameters } from './freshsales.types';

const leadSourceIds = {
	web: 26000997166,
	organic: 26000997167,
	email: 26000997168,
	phone: 26000997169,
	chat: 26000997170,
	'web-form': 26000997171,
	referral: 26000997172,
	direct: 26000997173,
	paid: 26000997174,
	blog: 26000997175,
	social: 26000997176,
	ad: 26000997177,
	events: 26000997178,
	webinar: 26000997179,
	'facebook-form': 26001071357,
};

class FreshSales {
	private key: string;
	private FRESHSALES_ADMIN_USERID = 26004178205;

	// change this be more selective of customers, vendors, etc.
	private ALL_CONTACTS_VIEW_ID = 26004135503;
	constructor() {
		if (!process.env.FRESHSALES_API_KEY)
			throw new Error(`Couldn't initialize FreshSales. No API key provided.`);
		this.key = process.env.FRESHSALES_API_KEY;
	}

	async createAccount(
		account: Partial<FreshSalesAccountParameters>
	): Promise<string> {
		try {
			const response = await axios.post(
				urlBuilder.freshSales.createAccount(),
				{
					sales_account: {
						...account,
						name: account.name,
						country: account.country ?? 'US',
						owner_id: this.FRESHSALES_ADMIN_USERID,
						custom_field: {
							slug: slugify(account.name!),
						},
					},
				},
				{
					headers: {
						...applicationHeaders,
						authorization: `Token token=${process.env.FRESHSALES_API_KEY}`,
					},
				}
			);

			console.info('response	', response.data);
			if (response.status > 299)
				throw new Error('Failed to upsert the contact.');

			return (response.data as { sales_account: { id: string } }).sales_account
				.id;
		} catch (error: any) {
			console.error('freshsales account create: ', error.message);
			throw new Error(
				error.response?.data?.errors?.message[0] || error.message
			);
		}
	}

	async upsertAccount(
		account: Partial<FreshSalesAccountParameters>
	): Promise<string> {
		try {
			const response = await axios.post(
				urlBuilder.freshSales.upsertAccount(),
				{
					unique_identifier: { name: account.name! },
					sales_account: {
						...account,
						name: account.name,
						country: account.country ?? 'US',
						owner_id: this.FRESHSALES_ADMIN_USERID,
						custom_field: {
							slug: slugify(account.name!),
						},
					},
				},
				{
					headers: {
						...applicationHeaders,
						authorization: `Token token=${process.env.FRESHSALES_API_KEY}`,
					},
				}
			);

			if (response.status > 299)
				throw new Error('Failed to upsert the contact.');
			console.info('response	', response.data);
			return (response.data as { sales_account: { id: string } }).sales_account
				.id;
		} catch (error: any) {
			console.error('freshsales account upsert: ', error.message);
			throw new Error(
				error.response?.data?.errors?.message[0] || error.message
			);
		}
	}

	async createContact({
		lead_source_id = leadSourceIds['organic'],
		medium = '',
		keyword = 'user',
		...contact
	}: Partial<FreshSalesContactParameters>): Promise<FreshSalesContactParameters> {
		try {
			console.info('create contact');
			const response = await axios.post<any>(
				urlBuilder.freshSales.createContact(),
				{
					contact: {
						...contact,
						lead_source_id,
						medium,
						keyword,
						country: contact.country ?? 'US',
					},
				},
				{
					headers: {
						...applicationHeaders,
						authorization: `Token token=${process.env.FRESHSALES_API_KEY}`,
					},
				}
			);

			console.info('freshsales create contact: ', response.data);
			if (response.status > 299)
				throw new Error('Failed to create the contact.');

			return (response.data as { contact: { id: string } })
				.contact as FreshSalesContactParameters;
		} catch (error: any) {
			console.error('freshsales create contact: ', error.message);
			throw new Error(
				error.response?.data?.errors?.message[0] || error.message
			);
		}
	}

	async upsertContact({
		lead_source_id = leadSourceIds['organic'],
		medium = '',
		keyword = 'user',
		...contact
	}: Partial<Customer> & FreshSalesAttribution): Promise<string> {
		try {
			const response = await axios.post<
				any,
				any,
				{
					unique_identifier: { emails: string } | { mobile_number: string };
					contact: Partial<FreshSalesContactParameters>;
				}
			>(
				urlBuilder.freshSales.upsertContact(),
				{
					unique_identifier: contact.email
						? { emails: contact.email! }
						: { mobile_number: contact.mobile_number! },
					contact: {
						...contact,
						country: contact.country ?? 'US',
						job_title: contact.job_title ?? '',
						email: contact.email,
						first_name: contact.first_name || '',
						last_name: contact.last_name || '',
						owner_id: this.FRESHSALES_ADMIN_USERID,
						medium,
						keyword,
						lead_source_id,
					} as any,
				},
				{
					headers: {
						...applicationHeaders,
						authorization: `Token token=${process.env.FRESHSALES_API_KEY}`,
					},
				}
			);

			if (response.status > 299)
				throw new Error('Failed to upsert the contact.');
			return (response.data as { contact: { id: string } }).contact.id;
		} catch (error: any) {
			console.error('freshsales upsert contact: ', error.message);
			throw new Error(
				error.response?.data?.errors?.message[0] || error.message
			);
		}
	}

	async createSegment(name: string): Promise<string> {
		try {
			const response = await axios.post<
				any,
				any,
				{
					name: string;
				}
			>(
				urlBuilder.freshSales.marketingList(),
				{
					name,
				},
				{
					headers: {
						...applicationHeaders,
						authorization: `Token token=${process.env.FRESHSALES_API_KEY}`,
					},
				}
			);

			if (response.status > 299)
				throw new Error(
					response.data.errors?.message?.[0] ?? 'Failed to create segment.'
				);
			console.info('response	', response.data);
			return (
				response.data as {
					list: {
						id: string;
						list_name: string;
					};
				}
			).list.id;
		} catch (error: any) {
			console.error('freshsales create segment: ', error.message);
			throw new Error(
				error.response?.data?.errors?.message[0] || error.message
			);
		}
	}

	// async getCustomerByEmail(
	// 	email: string
	// ): Promise<FreshSalesContactParameters | null> {
	// 	try {
	// 		if (!email) {
	// 			console.error('No email provided.');
	// 			return null;
	// 		}
	// 		const response = await axios(
	// 			urlBuilder.freshSales.getContacts(),
	// 			{
	// 				headers: {
	// 					...applicationHeaders,
	// 					authorization: `Token token=${process.env.FRESHSALES_API_KEY}`,
	// 				},
	// 			}
	// 		);
	// 		if (response.status > 299) throw new Error('Failed to create segment.');
	// 		return (
	// 			(
	// 				response.data as {
	// 					contacts: any[];
	// 				}
	// 			).contacts || []
	// 		);
	// 	} catch (error: any) {
	// 		console.error('freshsales get segment customers: ', error.message);
	// 		throw new Error(
	// 			error.response?.data?.errors?.message[0] || error.message
	// 		);
	// 	}
	// }

	async getContactByMobileNumber(
		mobile_number: string,
		segment: string
	): Promise<FreshSalesContactParameters | null> {
		try {
			if (!mobile_number) {
				console.error('No mobile_number provided.');
				return null;
			}
			const response = await axios(
				urlBuilder.freshSales.getContactsFromView(
					this.ALL_CONTACTS_VIEW_ID.toString()
				),
				{
					headers: {
						...applicationHeaders,
						authorization: `Token token=${process.env.FRESHSALES_API_KEY}`,
					},
				}
			);
			if (response.status > 299) throw new Error('Failed to create segment.');

			const allContacts =
				(
					response.data as {
						contacts: any[];
					}
				).contacts || [];
			console.info('allContacts', allContacts);

			const contact =
				(allContacts.length > 0 &&
					allContacts.find(
						(contact) =>
							prependDialCode(contact.mobile_number) ===
							prependDialCode(mobile_number)
					)) ||
				null;
			if (contact?.mobile_number) {
				contact.mobile_number = prependDialCode(contact.mobile_number);
			}

			console.info('contact', contact);

			return contact;
		} catch (error: any) {
			console.error('freshsales get segment customers: ', error.message);
			throw new Error(
				error.response?.data?.errors?.message[0] || error.message
			);
		}
	}

	async getSegmentCustomers(
		id: string
	): Promise<Partial<FreshSalesContactParameters>[]> {
		try {
			if (!id) {
				console.error('No segment id provided.');
				return [];
			}

			const response = await axios(
				urlBuilder.freshSales.getContactsFromList(id),
				{
					headers: {
						...applicationHeaders,
						authorization: `Token token=${process.env.FRESHSALES_API_KEY}`,
					},
				}
			);

			if (response.status > 299) throw new Error('Failed to create segment.');
			return (
				(
					response.data as {
						contacts: any[];
					}
				).contacts || []
			);
		} catch (error: any) {
			console.error('freshsales get segment customers: ', error.message);
			throw new Error(
				error.response?.data?.errors?.message[0] || error.message
			);
		}
	}

	async addCustomersToSegment(id: string, customerIds: string[] = []) {
		try {
			if (!id) {
				console.error('No segment id provided.');
				return [];
			}

			const response = await axios.put(
				urlBuilder.freshSales.addContactsToList(id),
				{ ids: customerIds.map((id) => parseInt(id)) },
				{
					headers: {
						...applicationHeaders,
						authorization: `Token token=${process.env.FRESHSALES_API_KEY}`,
					},
				}
			);

			console.info('add customers to segment: ', response.data);
			if (response.status > 299)
				throw new Error(
					response.data.errors?.message?.[0] ??
						'Failed to add customers to list.'
				);
			return (
				(
					response.data as {
						contacts: any[];
					}
				).contacts || []
			);
		} catch (error: any) {
			console.error('freshsales addCustomersToSegment: ', error.message);
			throw new Error(
				error.response?.data?.errors?.message[0] || error.message
			);
		}
	}

	async removeCustomersFromSegment(id: string, customerIds: string[] = []) {
		try {
			if (!id) {
				console.error('No segment id provided.');
				return [];
			}

			const response = await axios.put(
				urlBuilder.freshSales.removeContactsFromList(id),
				{ ids: customerIds.map((id) => parseInt(id)) },
				{
					headers: {
						...applicationHeaders,
						authorization: `Token token=${process.env.FRESHSALES_API_KEY}`,
					},
				}
			);

			console.info('remove customers from segment: ', response.data);
			if (response.status > 299)
				throw new Error(
					response.data.errors?.message?.[0] ??
						'Failed to add customers to list.'
				);
			return;
		} catch (error: any) {
			console.error('freshsales removeCustomersFromSegment: ', error.message);
			throw new Error(
				error.response?.data?.errors?.message[0] || error.message
			);
		}
	}
}



export default new FreshSales();

export { 
	leadSourceIds
}