/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable sonarjs/no-duplicate-string */
import { ObjectId, type UpdateFilter } from 'mongodb';
import { db_namespace, clientPromise } from '../db';
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
	where,
	data,
}: {
	where: { id: string } | { email: string } | any;
	data: UpdateFilter<User>;
}): Promise<User> => {
	data = normalizeUser(data);
	Object.hasOwnProperty.call(where, 'id') &&
		(where = { _id: new ObjectId(where.id) });
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	const user = (
		await client
			.db(db)
			.collection<User>(collections.users)
			.findOneAndUpdate(
				where,
				{ $set: normalizeUser(data) },
				{
					returnDocument: 'after',
				},
			)
	).value;
	return { ...user!, id: user!._id.toString() };
};

export const upsertUser = async ({
	where,
	update,
}: {
	where: { id: string } | { email: string } | any;
	update: UpdateFilter<User>;
}): Promise<User> => {
	update = normalizeUser(update);
	Object.hasOwnProperty.call(where, 'id') &&
		(where = { _id: new ObjectId(where.id) });
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	const user = (
		await client.db(db).collection<User>(collections.users).findOneAndUpdate(
			where,
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
	where: { id: string } | { email: string } | { phone: string } | any,
): Promise<User | null> => {
	Object.hasOwnProperty.call(where, 'id') &&
		(where = { _id: new ObjectId(where.id) });
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	const user = await client
		.db(db)
		.collection<User>(collections.users)
		.findOne(where);
	return (user && { id: user._id.toString(), ...normalizeUser(user) }) || null;
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

export const deleteUser = async (
	where: { id: string } | { email: string } | any,
) => {
	Object.hasOwnProperty.call(where, 'id') &&
		(where = { _id: new ObjectId(where.id) });
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	return await client.db(db).collection(collections.users).deleteOne(where);
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
