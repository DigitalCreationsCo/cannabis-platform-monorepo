/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable sonarjs/no-duplicate-string */
import { ObjectId, type UpdateFilter } from 'mongodb';
import { db_namespace } from '../db';
import { normalizeUser } from '../helpers';
import { type User } from './user.types';

export const createUser = async (data: {
	name: string;
	email: string;
	password?: string;
	emailVerified?: Date | null;
}): Promise<User> => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	const user = await (
		await client
			.db(db)
			.collection<User>(collections.users)
			.findOneAndUpdate(
				{ email: data.email },
				{ $set: normalizeUser(data) },
				{
					upsert: true,
					returnDocument: 'after',
				},
			)
	).value;
	console.trace('create user', user);
	return {
		...user!,
		id: user!._id.toString(),
	};
};

export const updateUser = async ({
	key,
	data,
}: {
	key: { id: string } | { email: string };
	data: UpdateFilter<User>;
}): Promise<User> => {
	data = normalizeUser(data);
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	const user = (
		await client
			.db(db)
			.collection<User>(collections.users)
			.findOneAndUpdate(
				{ _id: new ObjectId(id) },
				{ $set: normalizeUser(data) },
				{
					returnDocument: 'after',
				},
			)
	).value;
	return { ...user!, id: user!._id.toString() };
};

export const upsertUser = async ({
	id,
	update,
}: {
	id: string;
	update: UpdateFilter<User>;
}): Promise<User> => {
	console.trace('upsertUser ', id, update);
	update = normalizeUser(update);
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	const user = (
		await client
			.db(db)
			.collection<User>(collections.users)
			.findOneAndUpdate(
				{
					_id: new ObjectId(id),
				},
				{ $set: update },
				{
					upsert: true,
					returnDocument: 'after',
				},
			)
	).value;
	return { ...user!, id: user!._id.toString() };
};

export const getUser = async (
	key: { id: string } | { email: string } | { phone: string },
): Promise<User | null> => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	const user = await client
		.db(db)
		.collection<User>(collections.users)
		.findOne(key);
	return (user && { id: user._id, ...normalizeUser(user) }) || null;
};

export const getUserBySession = async (session: any) => {
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

export const findFirstUserOrThrow = async ({ id }: any) => {
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
