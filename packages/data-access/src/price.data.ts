/* eslint-disable @typescript-eslint/naming-convention */
import { ObjectId } from 'mongodb';
import { db_namespace, clientPromise } from './db';

export const getAllPrices = async () => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection<Price>(collections.prices)
		.find({})
		.toArray();
};

export const getServiceByPriceId = async (priceId: string) => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection(collections.prices)
		.find(
			{ _id: new ObjectId(priceId) },
			{
				projection: { service: 1 },
			},
		);
};

export type Price = {
	id: string;
	amount: number;
	currency: string;
	metadata?: {
		interval: 'month' | 'year';
		usage_type: 'metered' | 'licensed';
	};
	billingScheme: 'per_unit' | 'tiered' | 'metered';
	serviceId: string;
};

export type Service = {
	id: string;
	name: string;
	description: string;
};
