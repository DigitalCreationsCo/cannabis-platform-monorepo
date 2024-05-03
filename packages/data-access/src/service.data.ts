import { db_namespace } from './db';

export const getAllServices = async () => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	return await client.db(db).collection(collections.services).find({});
};
