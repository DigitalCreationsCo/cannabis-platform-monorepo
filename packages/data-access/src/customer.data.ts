/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { type MongoClient, ObjectId } from 'mongodb';
import { db_namespace } from './db';
import { type USStateAbbreviated } from './types';

/* METHODS
 * createCustomer
 * findCustomersByOrg
 * updateCustomer
 * deleteCustomer
 */

/**
 * create customer
 * @param customer customer data
 * @returns created customer
 */
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
			{ returnDocument: 'after' },
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
}): Promise<Customer> {
	Object.hasOwnProperty.call(where, 'id') &&
		(where = { _id: new ObjectId(where.id) });
	const { db, collections } = db_namespace;
	const customer = await client
		.db(db)
		.collection<Customer>(collections.customers)
		.findOne({ ...where, teamSlug });
	return { ...customer!, id: customer!._id.toString() };
}

export async function upsertCustomerByDispensary({
	client,
	data,
}: {
	client: MongoClient;
	data: Customer;
}): Promise<Customer> {
	const { db, collections } = db_namespace;
	const customer = (
		await client
			.db(db)
			.collection<Customer>(collections.customers)
			.findOneAndUpdate(
				{ email: data.email },
				{ $set: data },
				{ upsert: true, returnDocument: 'after' },
			)
	).value;
	return { ...customer!, id: customer!._id.toString() };
}

export type Customer = {
	id: string;
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
	city?: string;
	state?: USStateAbbreviated;
	zipcode?: number;
	birthdate?: string;
	teamSlug: string;
	doubleOptInMessage: string;
	isOptInMessages: boolean;
	slickTextTextwordId: string;
	rewards: any;
};
