interface FreshSalesContactParameters {
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
	sms_subscription_status: 0 | 1 | 2;
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

interface FreshSalesAccountParameters {
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

interface FreshSalesAttribution {
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

export {
    FreshSalesAccountParameters,
    FreshSalesAttribution,
    FreshSalesContactParameters,
}