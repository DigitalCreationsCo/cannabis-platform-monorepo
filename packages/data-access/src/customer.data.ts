/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { type MongoClient, ObjectId } from 'mongodb';
import { db_namespace } from './db';
import { type USStateAbbreviated } from './types';

export async function createCustomer({
	client,
	data,
}: {
	client: MongoClient;
	data: Customer;
}) {
	const { db, collections } = db_namespace;
	return {
		...data,
		id: (
			await client
				.db(db)
				.collection<Customer>(collections.customers)
				.insertOne(data)
		).insertedId.toString(),
	};
}

/**
 * find customers by organization
 * @param organizationId organization id
 * @returns customers
 */
export async function getCustomersByDispensary({
	client,
	where,
}: {
	client: MongoClient;
	where: { teamSlug: string };
}) {
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection(collections.customers)
		.aggregate([
			{
				$match: { teamSlug: where.teamSlug },
			},
			{
				$addFields: {
					id: { $toString: '$_id' },
				},
			},
		])
		.toArray();
}

/**
 * update customer
 * @param customer update data
 * @returns updated customer
 */
export async function updateCustomer({
	client,
	data,
}: {
	client: MongoClient;
	data: Customer;
}) {
	const { db, collections } = db_namespace;
	const customer = await client
		.db(db)
		.collection(collections.customers)
		.findOneAndUpdate(
			{ _id: new ObjectId(data.id) },
			{ $set: data },
			{ returnDocument: 'after' }
		);
	return { ...customer.value!, id: customer.value!._id.toString() };
}

/**
 * delete customer
 * @param id customer id
 * @returns string
 */
export async function deleteCustomer({
	client,
	where,
}: {
	client: MongoClient;
	where: { id: string };
}): Promise<string> {
	const { db, collections } = db_namespace;
	const customer = await client
		.db(db)
		.collection(collections.customers)
		.findOneAndDelete({ _id: new ObjectId(where.id) });
	return customer.value!._id.toString();
}

/**
 * find one customer
 * @param id
 * @param email
 * @param teamSlug
 * @returns string
 */
export async function getOneCustomerByDispensary({
	client,
	where,
	teamSlug,
}: {
	client: MongoClient;
	where: { id: string } | { email: string } | any;
	teamSlug: string;
}) {
	Object.hasOwnProperty.call(where, 'id') &&
		(where = { _id: new ObjectId(where.id) });
	const { db, collections } = db_namespace;
	const customer = await client
		.db(db)
		.collection(collections.customers)
		.findOne({ ...where, teamSlug });
	return { ...customer!, id: customer!._id.toString() };
}

export async function upsertCustomerByDispensary({
	client,
	data,
}: {
	client: MongoClient;
	data: Customer;
}) {
	const { db, collections } = db_namespace;
	const customer = (
		await client
			.db(db)
			.collection(collections.customers)
			.findOneAndUpdate(
				{ email: data.email },
				{ $set: data },
				{ upsert: true, returnDocument: 'after' }
			)
	).value;
	return { ...customer!, id: customer!._id.toString() };
}

// from mongo

// export type Customer = {
// 	id: string;
// 	firstName: string;
// 	lastName: string;
// 	phone: string;
// 	email: string;
// 	city?: string;
// 	state?: USStateAbbreviated;
// 	zipcode?: string;
// 	birthdate?: string;
// 	teamSlug: string;
// 	doubleOptInMessage: string;
// 	isOptInMessages: boolean;
// 	weedTextSegmentId: string;
// 	rewards: any;
// };

// from FreshSales
export interface Customer {
	id: number;
	first_name: string;
	last_name: string;
	display_name: string;
	avatar: string | null;
	job_title: string | null;
	city: string | null;
	state: string | null;
	zipcode: string | null;
	country: string | null;
	email: string;
	emails: {
		email: string;
	}[];
	time_zone: string | null;
	work_number: string | null;
	mobile_number: string;
	address: string | null;
	last_seen: string | null;
	lead_score: number;
	last_contacted: string | null;
	open_deals_amount: string;
	won_deals_amount: string;
	last_contacted_sales_activity_mode: string | null;
	custom_field: { birthdate?: string } & Record<string, any>;
	created_at: string;
	updated_at: string;
	keyword: string | null;
	medium: string | null;
	last_contacted_mode: string | null;
	recent_note: string | null;
	won_deals_count: number;
	last_contacted_via_sales_activity: string | null;
	completed_sales_sequences: string | null;
	active_sales_sequences: string | null;
	web_form_ids: string | null;
	open_deals_count: number;
	last_assigned_at: string;
	tags: string[];
	facebook: string | null;
	twitter: string | null;
	linkedin: string | null;
	is_deleted: boolean;
	team_user_ids: string | null;
	external_id: string | null;
	work_email: string | null;
	subscription_status: any;
	// subscription_status: number;
	subscription_types: any;
	// subscription_types: string;
	customer_fit: number;
	record_type_id: string;
	whatsapp_subscription_status: number;
	sms_subscription_status: number;
	last_seen_chat: string | null;
	first_seen_chat: string | null;
	locale: string | null;
	total_sessions: string | null;
	phone_numbers: string[];
}
