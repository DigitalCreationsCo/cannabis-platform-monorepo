/* eslint-disable sonarjs/no-duplicate-string */
import clientPromise, { db_namespace } from '../db';
import { normalizeUser } from '../helpers';

export const createUser = async (data: {
	name: string;
	email: string;
	password?: string;
	emailVerified?: Date | null;
}) => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	const user = await client
		.db(db)
		.collection(collections.users)
		.insertOne(normalizeUser(data));
	return { id: user.insertedId, ...normalizeUser(data) };
};

export const updateUser = async ({ id, data }) => {
	data = normalizeUser(data);
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	await client
		.db(db)
		.collection(collections.users)
		.updateOne({ _id: id }, normalizeUser(data));

	return { id, ...normalizeUser(data) };
};

export const upsertUser = async ({ id, update }) => {
	update = normalizeUser(update);
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	return await client.db(db).collection(collections.users).updateOne(
		{
			_id: id,
		},
		{ $set: update },
		{ upsert: true },
	);
};

export const getUser = async (
	key: { id: string } | { email: string } | { phone: string },
) => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	const user = await client.db(db).collection(collections.users).findOne(key);

	return normalizeUser(user);
};

export const getUserBySession = async (session) => {
	if (session === null || session.user === null) {
		return null;
	}

	const id = session?.user?.id;

	if (!id) {
		return null;
	}

	return await getUser({ id });
};

export const deleteUser = async (key: { id: string } | { email: string }) => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	return await client.db(db).collection(collections.users).deleteOne(key);
};

export const findFirstUserOrThrow = async ({ id }) => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	const user = await client
		.db(db)
		.collection(collections.users)
		.findOne({ _id: id });

	if (!user) {
		throw new Error('User not found');
	}

	return normalizeUser(user);
};
