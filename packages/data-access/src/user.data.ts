/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable sonarjs/no-duplicate-string */
import {
	type MongoClient,
	ObjectId,
	type UpdateFilter,
	type WithId,
} from 'mongodb';
import { db_namespace } from './db';
import { normalizeUser } from './helpers';
import { type User } from './types/user.types';

export const createUser = async ({
	client,
	data,
}: {
	client: MongoClient;
	data: {
		name: string;
		email: string;
		password?: string;
		emailVerified?: Date | null;
	};
}): Promise<User> => {
	const { db, collections } = db_namespace;

	const _id = new ObjectId();
	await await client
		.db(db)
		.collection(collections.users)
		.insertOne({
			...normalizeUser(data),
			_id,
			id: _id.toString(),
			createdAt: new Date(),
			updatedAt: new Date(),
		});
	return { ...normalizeUser(data), _id, id: _id.toString() };
	// return await (
	// 	(await client
	// 		.db(db)
	// 		.collection(collections.users)
	// 		.aggregate([
	// 			{
	// 				$documents: [
	// 					{
	// 						_id,
	// 						...normalizeUser(data),
	// 						createdAt: new Date(),
	// 						updatedAt: new Date(),
	// 					},
	// 				],
	// 			},
	// 			{
	// 				$addFields: {
	// 					id: { $toString: '$_id' },
	// 				},
	// 			},
	// 			{
	// 				$merge: {
	// 					into: collections.users,
	// 					on: '_id',
	// 					whenMatched: 'fail',
	// 					whenNotMatched: 'insert',
	// 				},
	// 			},
	// 		])
	// 		.toArray()) as User[]
	// )[0]!;
};

export const updateUser = async ({
	client,
	where,
	data,
}: {
	client: MongoClient;
	where: { id: string } | { email: string } | any;
	data: UpdateFilter<User>;
}): Promise<User> => {
	data = normalizeUser(data);
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
				}
			)
	).value;
	return { ...user!, id: user!._id.toString() };
};

export const upsertUser = async ({
	client,
	where,
	update,
}: {
	client: MongoClient;
	where: { id: string } | { email: string } | any;
	update: UpdateFilter<User>;
}): Promise<User> => {
	update = normalizeUser(update);
	const { db, collections } = db_namespace;
	const user = (
		await client.db(db).collection<User>(collections.users).findOneAndUpdate(
			where,
			{ $set: update },
			{
				upsert: true,
				returnDocument: 'after',
			}
		)
	).value;
	return { ...user!, id: user!._id.toString() };
};

export const getUser = async ({
	client,
	where,
}: {
	client: MongoClient;
	where: { id: string } | { email: string } | { phone: string } | any;
}): Promise<User | null> => {
	const { db, collections } = db_namespace;
	const user = (await client
		.db(db)
		.collection<User>(collections.users)
		.findOne(where)) as WithId<User>;
	return (user && { ...normalizeUser(user), id: user._id.toString() }) || null;
};

export const getUserBySession = async ({
	client,
	session,
}: {
	client: MongoClient;
	session: any;
}) => {
	if (session === null || session.user === null) {
		return null;
	}

	const id = session?.user?.id;

	if (!id) {
		return null;
	}

	return await getUser({ client, where: { id } });
};

export const deleteUser = async ({
	client,
	where,
}: {
	client: MongoClient;
	where: { id: string } | { email: string } | any;
}) => {
	const { db, collections } = db_namespace;
	return await client.db(db).collection(collections.users).deleteOne(where);
};

export const findFirstUserOrThrow = async ({
	client,
	where,
}: {
	client: MongoClient;
	where: { id: string };
}) => {
	const { db, collections } = db_namespace;
	const user = await client
		.db(db)
		.collection(collections.users)
		.findOne({ _id: new ObjectId(where.id) });

	if (!user) {
		throw new Error('User not found');
	}

	return normalizeUser(user);
};
