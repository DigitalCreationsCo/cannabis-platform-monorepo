import { db_namespace, clientPromise } from './db';
import { type Service } from './price.data';

export const getAllServices = async (): Promise<Service[]> => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	return (
		(await client
			.db(db)
			.collection<Service>(collections.services)
			.find({})
			.toArray()) || []
	);
};
