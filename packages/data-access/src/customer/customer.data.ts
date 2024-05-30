/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ObjectId } from 'mongodb';
import { type USStateAbbreviated } from '../address.types';
import { clientPromise, db_namespace } from '../db';

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
export async function createCustomer(customer: Customer) {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	return {
		...customer,
		id: (
			await client
				.db(db)
				.collection<Customer>(collections.customers)
				.insertOne(customer)
		).insertedId.toString(),
	};
}

/**
 * find customers by organization
 * @param organizationId organization id
 * @returns customers
 */
export async function getCustomersByDispensary(teamSlug: string) {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection(collections.customers)
		.aggregate([
			{
				$match: { teamSlug },
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
export async function updateCustomer(update: Customer) {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	const customer = await client
		.db(db)
		.collection(collections.customers)
		.findOneAndUpdate(
			{ _id: new ObjectId(update.id) },
			{ $set: update },
			{ returnDocument: 'after' },
		);
	return { ...customer.value!, id: customer.value!._id.toString() };
}

/**
 * delete customer
 * @param id customer id
 * @returns string
 */
export async function deleteCustomer(id: string): Promise<string> {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	const customer = await client
		.db(db)
		.collection(collections.customers)
		.findOneAndDelete({ _id: new ObjectId(id) });
	return customer.value!._id.toString();
}

/**
 * find one customer
 * @param id
 * @param email
 * @param teamSlug
 * @returns string
 */
export async function getOneCustomerByDispensary(
	where: { id: string } | { email: string } | any,
	teamSlug: string,
): Promise<Customer> {
	Object.hasOwnProperty.call(where, 'id') &&
		(where = { _id: new ObjectId(where.id) });
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	const customer = await client
		.db(db)
		.collection<Customer>(collections.customers)
		.findOne({ ...where, teamSlug });
	return { ...customer!, id: customer!._id.toString() };
}

export async function upsertCustomerByDispensary(
	upsert: Customer,
): Promise<Customer> {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	const customer = (
		await client
			.db(db)
			.collection<Customer>(collections.customers)
			.findOneAndUpdate(
				{ email: upsert.email },
				{ $set: upsert },
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
