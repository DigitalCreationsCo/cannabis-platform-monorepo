/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ObjectId } from 'mongodb';
import { db_namespace } from '../db';
import { type Dispensary } from '../dispensary/dispensary.types';
import { normalizeUser } from '../helpers';
import { type Role } from '../role.types';
import { getUser } from '../user/user.data';
import { type StaffMember } from './staff.types';

export const addStaffMember = async (
	dispensary: Dispensary | string,
	userId: string,
	role: Role,
): Promise<StaffMember> => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	if (typeof dispensary === 'string') {
		dispensary = (
			await client
				.db(db)
				.collection<Dispensary>(collections.dispensaries)
				.findOneAndUpdate(
					{ _id: new ObjectId(dispensary) },
					{ $push: { members: userId } },
				)
		).value as Dispensary;
	} else {
		client
			.db(db)
			.collection<Dispensary>(collections.dispensaries)
			.findOneAndUpdate(
				{ _id: new ObjectId(dispensary.id) },
				{ $push: { members: userId } },
			);
	}
	const staffMember = (
		await client
			.db(db)
			.collection<StaffMember>(collections.staff)
			.findOneAndUpdate(
				{ teamId: dispensary.id, _id: new ObjectId(userId) },
				{
					$set: {
						role,
						team: dispensary,
					},
				},
				{ upsert: true },
			)
	).value;
	return {
		...staffMember!,
		id: staffMember!._id.toString(),
		team: dispensary,
	};
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
