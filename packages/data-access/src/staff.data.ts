/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { type MongoClient, ObjectId } from 'mongodb';
import { db_namespace } from './db';
import { normalizeUser } from './helpers';
import { type Dispensary } from './types/dispensary.types';
import { type Role } from './types/role.types';
import {
	type StaffMemberWithUser,
	type StaffMember,
} from './types/staff.types';
import { getUser } from './user.data';

export const addStaffMember = async ({
	client,
	dispensary,
	userId,
	role,
}: {
	client: MongoClient;
	dispensary: Dispensary | string;
	userId: string;
	role: Role;
}): Promise<StaffMember> => {
	const { db, collections } = db_namespace;
	if (typeof dispensary === 'string') {
		dispensary = (
			await client
				.db(db)
				.collection<Dispensary>(collections.dispensaries)
				.findOneAndUpdate(
					{ _id: new ObjectId(dispensary) },
					{ $push: { members: userId } }
				)
		).value as Dispensary;
	} else {
		client
			.db(db)
			.collection<Dispensary>(collections.dispensaries)
			.findOneAndUpdate(
				{ _id: new ObjectId(dispensary.id) },
				{ $push: { members: userId } }
			);
	}
	console.info('dispensary here: ', dispensary);
	const staffMember = (
		await client
			.db(db)
			.collection<StaffMember>(collections.staff)
			.findOneAndUpdate(
				{ teamId: dispensary.id, userId },
				{
					$set: {
						role,
						team: dispensary,
					},
				},
				{ upsert: true, returnDocument: 'after' }
			)
	).value;
	return {
		...staffMember!,
		id: staffMember!._id.toString(),
		team: dispensary,
	};
};

export const updateStaffMember = async ({
	client,
	data,
}: {
	client: MongoClient;
	data: Partial<StaffMemberWithUser>;
}) => {
	data = normalizeUser(data);
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection(collections.staff)
		.updateOne({ _id: new Object(data.id) }, normalizeUser(data));
};

export const upsertStaffMember = async ({
	client,
	data,
}: {
	client: MongoClient;
	data: any;
}) => {
	data = normalizeUser(data);
	const { db, collections } = db_namespace;
	return await client.db(db).collection(collections.staff).updateOne(
		{
			_id: data.id,
		},
		{ $set: data },
		{ upsert: true }
	);
};

export const getStaffMemberBySession = async ({
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

export const deleteStaffMember = async ({
	client,
	where,
}: {
	client: MongoClient;
	where: { id: string } | { email: string };
}) => {
	const { db, collections } = db_namespace;
	return await client.db(db).collection(collections.staff).deleteOne(where);
};

export const findFirstStaffMemberOrThrow = async ({
	client,
	where,
}: {
	client: MongoClient;
	where: { id: string };
}) => {
	const { db, collections } = db_namespace;
	const user = await client
		.db(db)
		.collection(collections.staff)
		.findOne({ _id: new ObjectId(where.id) });

	if (!user) {
		throw new Error('Staff Member not found');
	}

	return normalizeUser(user);
};

export const countStaffMembers = async ({
	client,
	where,
}: {
	client: MongoClient;
	where: any;
}) => {
	const { db, collections } = db_namespace;
	return client.db(db).collection(collections.staff).countDocuments(where);
};
