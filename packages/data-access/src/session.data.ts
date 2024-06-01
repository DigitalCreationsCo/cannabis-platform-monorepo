import { db_namespace } from './db';

export const deleteManySessions = async ({ client, where }: any) => {
	const { db, collections } = db_namespace;
	return await client.db(db).collection(collections.sessions).deleteMany(where);
};

export const findFirstSessionOrThrown = async ({ client, where }: any) => {
	const { db, collections } = db_namespace;
	return await client.db(db).collection(collections.sessions).findOne(where);
};

export const findManySessions = async ({ client, where }: any) => {
	const { db, collections } = db_namespace;
	return await client.db(db).collection(collections.sessions).find(where);
};

export const deleteSession = async ({ client, where }: any) => {
	const { db, collections } = db_namespace;
	return await client.db(db).collection(collections.sessions).deleteOne(where);
};
