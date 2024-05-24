import { db_namespace, clientPromise } from './db';

export const getAccount = async (where: { userId: string }) => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	return await client.db(db).collection(collections.accounts).findOne(where);
};
