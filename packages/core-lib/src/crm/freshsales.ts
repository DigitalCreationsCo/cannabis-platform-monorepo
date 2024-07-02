/* eslint-disable @typescript-eslint/naming-convention */
import { type Customer } from '@cd/data-access';
import { applicationHeaders, axios } from '../axiosInstance';
import { urlBuilder } from '../utils/urlBuilder';

class FreshSales {
	private key: string;
	private FRESHSALES_ADMIN_USERID = 26004178205;
	constructor() {
		if (!process.env.FRESHSALES_API_KEY)
			throw new Error(`Couldn't initialize FreshSales. No API key provided.`);
		this.key = process.env.FRESHSALES_API_KEY;
	}

	async createContact(contact: Partial<FreshSalesContactParameters>) {
		try {
			console.info('create contact');
			const response = await axios.post<any>(
				urlBuilder.freshSales.createContact(),
				{
					contact: {
						lead_source_id: null,
						medium: 'new-visitor',
						keyword: 'visitor',
						...contact,
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
			// if (response.status > 299)
			// 	throw new Error('Failed to create the contact.');
			// return response.data.Response;
		} catch (error: any) {
			console.error('freshsales create contact: ', error.message);
			// throw new Error(
			// 	error.response?.data?.errors?.message[0] || error.message
			// );
		}
	}

	async upsertContact(
		contact: Pick<
			Customer,
			| 'email'
			| 'first_name'
			| 'last_name'
			| 'mobile_number'
			| 'city'
			| 'state'
			| 'zipcode'
			| 'custom_field'
		> & {
			work_number?: string;
			job_title?: string;
			address?: string;
			country?: string;
			medium?: string;
			keyword?: string;
		},
		attribution: FreshSalesAttribution
	): Promise<string> {
		try {
			const response = await axios.post<
				any,
				any,
				{
					unique_identifier: { emails: string };
					contact: Partial<FreshSalesContactParameters>;
				}
			>(
				urlBuilder.freshSales.upsertContact(),
				{
					unique_identifier: { emails: contact.email },
					contact: {
						...contact,
						job_title: contact.job_title ?? '',
						email: contact.email,
						first_name: contact.first_name || '',
						last_name: contact.last_name || '',
						lead_source_id: undefined,
						owner_id: this.FRESHSALES_ADMIN_USERID,
						medium: 'new-visitor',
						...attribution,
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
			console.info('response	', response.data);
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
				urlBuilder.freshSales.addContactToList(id),
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
}

export default new FreshSales();

export interface FreshSalesContactParameters {
	id: number | string;
	first_name: string;
	last_name: string;
	job_title: string;
	email: string;
	emails: { email: string }[]; // Assuming each email is an object with an email string property
	work_number: string;
	external_id: string;
	mobile_number: string;
	address: string;
	city: string;
	state: string;
	zipcode: string;
	country: string;
	sales_accounts: any[]; // Assuming each account is an object with an account string property
	territory_id: number;
	lead_source_id: number;
	owner_id: number;
	// subscription_status: Array<any>; // Assuming each status is an object with a status string property
	subscription_status: any; // Assuming each status is an object with a status string property
	// subscription_types: Array<{
	// 	id: number;
	// 	type:
	// 		| 'Newsletter'
	// 		| 'Promotional'
	// 		| 'Product updates'
	// 		| 'Conferences & Events'
	// 		| 'Non-marketing emails';
	// }>;
	subscription_types: any;
	medium: string;
	campaign_id: number;
	keyword: string;
	time_zone: string;
	facebook: string;
	twitter: string;
	linkedin: string;
	created_at: string;
	updated_at: string;
	contact_status_id: number;
	sales_account_id: number; // Deprecated
	lifecycle_stage_id: number;
	custom_field: any;
}

export interface FreshSalesAttribution {
	sales_accounts?: any[]; // Assuming each account is an object with an account string property
	territory_id?: number;
	lead_source_id?: number;
	owner_id?: number;
	subscription_status?: { status: string }[] | any; // Assuming each status is an object with a status string property
	subscription_types?:
		| {
				id: number;
				type:
					| 'Newsletter'
					| 'Promotional'
					| 'Product updates'
					| 'Conferences & Events'
					| 'Non-marketing emails';
		  }[]
		| string;
	medium?: string;
	campaign_id?: number;
	keyword: string;
	time_zone?: string;
}
