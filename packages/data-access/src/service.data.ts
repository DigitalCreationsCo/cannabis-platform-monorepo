import { type MongoClient } from 'mongodb';
import { db_namespace } from './db';
import { type Service } from './price.data';

export const getAllServices = async ({
	client,
}: {
	client: MongoClient;
}): Promise<Service[]> => {
	const { db, collections } = db_namespace;
	return (
		(await client
			.db(db)
			.collection<Service>(collections.services)
			.find({})
			.toArray()) || []
	);
};
