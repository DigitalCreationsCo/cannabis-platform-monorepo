/* eslint-disable @typescript-eslint/naming-convention */
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

	let staffMember: StaffMember;

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

	// eslint-disable-next-line prefer-const
	staffMember = (
		await client
			.db(db)
			.collection<StaffMember>(collections.staff)
			.findOneAndUpdate(
				{ teamId: dispensary.id, userId },
				{
					$set: {
						role,
						teamId: dispensary.id,
						teamSlug: dispensary.slug,
						id: userId,
					},
				},
				{ upsert: true, returnDocument: 'after' }
			)
	).value as StaffMember;

	return {
		...staffMember!,
		id: staffMember!.id,
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
		.updateOne({ id: data.id }, normalizeUser(data));
};

export const upsertStaffMember = async ({
	client,
	data,
}: {
	client: MongoClient;
	data: Partial<StaffMemberWithUser>;
}) => {
	data = normalizeUser(data);
	const { db, collections } = db_namespace;
	return await client.db(db).collection(collections.staff).updateOne(
		{
			id: data.id,
		},
		{ $set: data },
		{ upsert: true }
	);
};

export const getStaffMember = async ({
	client,
	where,
}: {
	client: MongoClient;
	where: {
		userId: string;
		slug?: string;
	};
}): Promise<StaffMemberWithUser> => {
	const { db, collections } = db_namespace;

	return (
		await client
			.db(db)
			.collection(collections.staff)
			.aggregate<StaffMemberWithUser>([
				{
					$match: { userId: where.userId, teamSlug: where.slug },
				},
				{ $addFields: { _userId: { $toObjectId: '$userId' } } },
				{
					$lookup: {
						from: collections.users,
						localField: '_userId',
						foreignField: '_id',
						as: 'user',
					},
				},
				{
					$unwind: '$user',
				},
				{
					$lookup: {
						from: collections.dispensaries,
						localField: 'teamSlug',
						foreignField: 'slug',
						as: 'team',
					},
				},
				{
					$unwind: '$team',
				},
				{ $addFields: { 'team.id': { $toString: '$team._id' } } },
			])
			.toArray()
	)[0]!;
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

	// get staff with team document
	return await getStaffMember({ client, where: { userId: id } });
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
	const staffMember = await client
		.db(db)
		.collection(collections.staff)
		.findOne({ id: where.id });

	if (!staffMember) {
		throw new Error('Staff Member not found');
	}

	return normalizeUser(staffMember);
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

export const getStaffMembers = async ({
	client,
	where,
}: {
	client: MongoClient;
	where: { slug: string };
}) => {
	const { db, collections } = db_namespace;
	const staffMembers = await client
		.db(db)
		.collection<StaffMemberWithUser>(collections.staff)
		.aggregate<StaffMemberWithUser>([
			{
				$match: { teamSlug: where.slug },
			},
			{
				$lookup: {
					from: collections.users,
					localField: 'userId',
					foreignField: 'id',
					as: 'user',
				},
			},
			{
				$unwind: '$user',
			},
			{
				$lookup: {
					from: collections.dispensaries,
					localField: 'teamSlug',
					foreignField: 'slug',
					as: 'team',
				},
			},
			{
				$unwind: '$team',
			},
		])
		.toArray();
	return staffMembers?.map((member) => {
		member = normalizeUser(member);
		return member;
	});
};
