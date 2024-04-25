import clientPromise, { db_namespace } from '../db';
import { normalizeUser } from '../helpers';

export const createStaffMember = async (data: {
	name: string;
	email: string;
	password?: string;
	emailVerified?: Date | null;
}) => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection(collections.staff)
		.insertOne(normalizeUser(data));
};

export const updateStaffMember = async ({ id, data }) => {
	data = normalizeUser(data);
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection(collections.staff)
		.updateOne({ _id: id }, normalizeUser(data));
};

export const upsertStaffMember = async ({ id, update }) => {
	update = normalizeUser(update);
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	return await client.db(db).collection(collections.staff).updateOne(
		{
			_id: id,
		},
		{ $set: update },
		{ upsert: true },
	);
};

export const getStaffMember = async (
	key: { id: string } | { email: string } | { phone: string },
) => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	const user = await client.db(db).collection(collections.staff).findOne(key);

	return normalizeUser(user);
};

export const getStaffMemberBySession = async (session: Session | null) => {
	if (session === null || session.user === null) {
		return null;
	}

	const id = session?.user?.id;

	if (!id) {
		return null;
	}

	return await getStaffMember({ id });
};

export const deleteStaffMember = async (
	key: { id: string } | { email: string },
) => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	return await client.db(db).collection(collections.staff).deleteOne(key);
};

export const findFirstStaffMemberOrThrow = async ({ id }) => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	const user = await client
		.db(db)
		.collection(collections.staff)
		.findOne({ _id: id });

	if (!user) {
		throw new Error('Staff Member not found');
	}

	return normalizeUser(user);
};
