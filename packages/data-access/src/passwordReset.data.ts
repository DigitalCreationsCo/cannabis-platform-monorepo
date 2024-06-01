import { type MongoClient } from 'mongodb';
import { db_namespace } from './db';

export const createPasswordReset = async ({
	client,
	data,
}: {
	client: MongoClient;
	data: any;
}) => {
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection(collections.passwordReset)
		.insertOne(data);
};

export const getPasswordReset = async ({
	client,
	where,
}: {
	client: MongoClient;
	where: { token: string };
}) => {
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection(collections.passwordReset)
		.findOne({ token: where.token });
};

export const deletePasswordReset = async ({
	client,
	where,
}: {
	client: MongoClient;
	where: { token: string };
}) => {
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection(collections.passwordReset)
		.deleteOne({ token: where.token });
};
