import { db_namespace } from './db';

export const getAccount = async (key: { userId: string }) => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	return await client.db(db).collection(collections.accounts).findOne(key);
};
