import clientPromise, { db_namespace } from '../db';

export const deleteManySessions = async ({ where }) => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	return await client.db(db).collection(collections.sessions).deleteMany(where);
};

export const findFirstSessionOrThrown = async ({ where }) => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	return await client.db(db).collection(collections.sessions).findOne(where);
};

export const findManySessions = async ({ where }) => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	return await client.db(db).collection(collections.sessions).find(where);
};

export const deleteSession = async ({ where }) => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	return await client.db(db).collection(collections.sessions).deleteOne(where);
};
