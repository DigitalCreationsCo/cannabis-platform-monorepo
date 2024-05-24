import { db_namespace, clientPromise } from './db';

export const createPasswordReset = async ({ data }: any) => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection(collections.passwordReset)
		.insertOne(data);
};

export const getPasswordReset = async (token: string) => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection(collections.passwordReset)
		.findOne({ token });
};

export const deletePasswordReset = async (token: string) => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection(collections.passwordReset)
		.deleteOne({ token });
};
