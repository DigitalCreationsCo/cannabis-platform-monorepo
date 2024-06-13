/* eslint-disable @typescript-eslint/naming-convention */
import { ObjectId, type MongoClient } from 'mongodb';
import { db_namespace } from './db';

export const getAllPrices = async ({ client }: { client: MongoClient }) => {
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection<Price>(collections.prices)
		.find({})
		.toArray();
};

export const getServiceByPriceId = async ({
	client,
	where,
}: {
	client: MongoClient;
	where: { priceId: string };
}) => {
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection(collections.prices)
		.find(
			{ _id: new ObjectId(where.priceId) },
			{
				projection: { service: 1 },
			}
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
