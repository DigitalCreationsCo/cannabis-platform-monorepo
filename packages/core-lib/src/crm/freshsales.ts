/* eslint-disable @typescript-eslint/naming-convention */
import { type Customer } from '@cd/data-access';
import { applicationHeaders, axios } from '../axiosInstance';
import { slugify } from '../utils/common.util';
import { urlBuilder } from '../utils/urlBuilder';

class FreshSales {
	private key: string;
	private FRESHSALES_ADMIN_USERID = 26004178205;
	constructor() {
		if (!process.env.FRESHSALES_API_KEY)
			throw new Error(`Couldn't initialize FreshSales. No API key provided.`);
		this.key = process.env.FRESHSALES_API_KEY;
	}

	async createAccount(
		account: Partial<FreshSalesAccountParameters>
	): Promise<string> {
		try {
			console.trace('create crm account');
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
			console.trace('upsert crm account');
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
						country: contact.country ?? 'US',
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

export interface FreshSalesAccountParameters {
	id: number; // Unique ID of the account
	name: string; // Name of the account
	address?: string; // Address of the account
	city?: string; // City that the account belongs to
	state?: string; // State that the account belongs to
	zipcode?: string; // Zipcode of the region that the account belongs to
	country?: string; // Country that the account belongs to
	industry_type_id?: number; // ID of the industry that the account belongs to
	business_type_id?: number; // ID of the business that the account belongs to
	number_of_employees?: number; // Number of employees in the account
	annual_revenue?: number; // Annual revenue of the account
	website?: string; // Website of the account
	phone?: string; // Phone number of the account
	owner_id?: number; // ID of the user to whom the account has been assigned
	facebook?: string; // Facebook username of the account
	twitter?: string; // Twitter username of the account
	linkedin?: string; // LinkedIn account of the account
	territory_id?: number; // ID of the territory that the account belongs to
	created_at: Date; // Account creation timestamp
	updated_at: Date; // Account updated timestamp
	parent_sales_account_id?: number; // Parent account id of the account
	custom_field: any; // Custom fields of the account
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
