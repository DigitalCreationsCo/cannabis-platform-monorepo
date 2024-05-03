import { db_namespace } from '../db';
import { normalizeUser } from '../helpers';
import { getUser } from '../user/user.data';

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

export const updateStaffMember = async ({ id, data }: any) => {
	data = normalizeUser(data);
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection(collections.staff)
		.updateOne({ _id: id }, normalizeUser(data));
};

export const upsertStaffMember = async ({ id, update }: any) => {
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

export const getStaffMemberBySession = async (session: any) => {
	if (session === null || session.user === null) {
		return null;
	}

	const id = session?.user?.id;

	if (!id) {
		return null;
	}

	return await getUser({ id });
};

export const deleteStaffMember = async (
	key: { id: string } | { email: string },
) => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	return await client.db(db).collection(collections.staff).deleteOne(key);
};

export const findFirstStaffMemberOrThrow = async ({ id }: any) => {
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

export const countStaffMembers = async ({ where }: any) => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	return client.db(db).collection(collections.staff).countDocuments(where);
};
