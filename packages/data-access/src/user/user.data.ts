/* eslint-disable sonarjs/no-duplicate-string */
import { createId } from '@paralleldrive/cuid2';
import {
	type Prisma,
	type ImageUser,
	type Membership,
	type MembershipRole,
	type User,
} from '@prisma/client';
import type { Session } from 'next-auth';
import {
	type AddressCreateType,
	type AddressWithCoordinates,
} from '../address.types';
import clientPromise, { db_namespace } from '../db';
import { type OrganizationWithDashboardDetails } from '../dispensary/organization.types';
import { normalizeUser } from '../helpers';
import { type OrderWithShopDetails } from '../order/order.types';

export const createUser = async (data: {
	name: string;
	email: string;
	password?: string;
	emailVerified?: Date | null;
}) => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection(collections.users)
		.insertOne(normalizeUser(data));
};

export const updateUser = async ({ id, data }) => {
	data = normalizeUser(data);
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection(collections.users)
		.updateOne({ _id: id }, normalizeUser(data));
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

export const getUserBySession = async (session: Session | null) => {
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
