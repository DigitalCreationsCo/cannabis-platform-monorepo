import { type MongoClient } from 'mongodb';
import { db_namespace } from './db';

export const getAccount = async ({
	client,
	where,
}: {
	client: MongoClient;
	where: { userId: string };
}) => {
	const { db, collections } = db_namespace;
	return await client.db(db).collection(collections.accounts).findOne(where);
};
