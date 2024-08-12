/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
	type Document,
	type MongoClient,
	ObjectId,
	type UpdateFilter,
} from 'mongodb';
import { db_namespace } from './db';
// eslint-disable-next-line import/no-cycle
import { getDispensary } from './dispensary.data';
import { normalizeUser } from './helpers';
import { type Dispensary } from './types/dispensary.types';
import { type Role } from './types/role.types';
import {
	type StaffMemberWithDispensary,
	type StaffMember,
} from './types/staff.types';

export const createStaffMember = async ({
	client,
	dispensary,
	user,
	role,
}: {
	client: MongoClient;
	dispensary?: Dispensary | string;
	user: Pick<StaffMember, 'name' | 'email'> & Partial<StaffMember>;
	role?: Role;
}): Promise<StaffMember> => {
	const { db, collections } = db_namespace;

	let staffMember;
	if (typeof dispensary === 'string') {
		dispensary = (await getDispensary({
			client,
			where: { id: dispensary },
		})) as Dispensary;

		// create staff member with team id and team slug
		staffMember = (
			await client
				.db(db)
				.collection<StaffMember>(collections.staff)
				.aggregate<StaffMemberWithDispensary>([
					{
						$set: {
							...normalizeUser(user),
							role,
							_id: { $objectId: {} },
						},
						$addToSet: { teams: dispensary.id },
					},
					{
						$set: {
							id: { $toString: '$_id' },
						},
					},
					{
						$merge: {
							into: collections.staff,
							whenMatched: 'fail', // This will cause the operation to fail if a document with the same _id already exists
						},
					},
				])
				.toArray()
		)[0] as StaffMember;
	} else {
		// create staff member without team id and team slug
		staffMember = (
			await client
				.db(db)
				.collection<StaffMember>(collections.staff)
				.aggregate<StaffMember>([
					{
						$set: {
							...normalizeUser(user),
							role,
							_id: { $objectId: {} },
						},
					},
					{
						$set: {
							id: { $toString: '$_id' },
						},
					},
					{
						$merge: {
							into: collections.staff,
							whenMatched: 'fail', // This will cause the operation to fail if a document with the same _id already exists
						},
					},
				])
				.toArray()
		)[0] as StaffMember;
		return staffMember;
	}

	return staffMember;
};

export const addStaffMemberToDispensary = async ({
	client,
	dispensaryId,
	staffMemberId,
	role,
}: {
	client: MongoClient;
	// dispensary: Dispensary | string;
	dispensaryId: string;
	staffMemberId: string;
	role: Role;
}): Promise<void> => {
	const { db, collections } = db_namespace;

	await client
		.db(db)
		.collection<StaffMember>(collections.staff)
		.findOneAndUpdate(
			{ id: staffMemberId },
			{
				$set: {
					role, // roles are user wide, not specific roles to teams
				},
				// use $addToSet instead of $push to ensure no duplicate ids
				$addToSet: { teams: dispensaryId },
			}
		);

	(await (
		await client
			.db(db)
			.collection<Dispensary>(collections.dispensaries)
			.findOneAndUpdate(
				{ _id: new ObjectId(dispensaryId) },
				{ $push: { members: staffMemberId } }
			)
	).value) as Dispensary;

	// return {
	// 	...staffMember,
	// 	team: dispensary,
	// };
};

export const updateStaffMember = async ({
	client,
	where,
	data,
}: {
	client: MongoClient;
	where: { id: string } | { email: string };
	data: UpdateFilter<StaffMember>;
}): Promise<StaffMember> => {
	data = normalizeUser(data);
	const { db, collections } = db_namespace;
	const staffMember = await (
		await client
			.db(db)
			.collection<StaffMember>(collections.staff)
			.findOneAndUpdate(
				where,
				{ $set: normalizeUser(data) },
				{
					returnDocument: 'after',
				}
			)
	).value;

	return { ...staffMember!, id: staffMember!._id.toString() };
};

export const upsertStaffMember = async ({
	client,
	where,
	update,
}: {
	client: MongoClient;
	where: { id: string } | { email: string };
	update: Partial<StaffMember>;
}): Promise<StaffMember> => {
	update = normalizeUser(update);
	const { db, collections } = db_namespace;
	const staffMember = await (
		await client
			.db(db)
			.collection<StaffMember>(collections.staff)
			.findOneAndUpdate(where, { $set: update }, { upsert: true })
	).value;
	return staffMember!;
};

export const getStaffMember = async ({
	client,
	where,
}: {
	client: MongoClient;
	where:
		| {
				id: string;
				email?: never;
		  }
		| {
				id?: never;
				email: string;
		  };
}): Promise<StaffMember> => {
	const { db, collections } = db_namespace;

	return (
		await client
			.db(db)
			.collection(collections.staff)
			.aggregate<StaffMember>([
				{
					$match: { where },
				},
			])
			.toArray()
	)[0]!;
};

export const getStaffMemberWithDispensary = async ({
	client,
	where,
}: {
	client: MongoClient;
	where:
		| {
				id: string;
				teamSlug: string;
				email?: never;
		  }
		| {
				id?: never;
				teamSlug: string;
				email: string;
		  };
}): Promise<StaffMemberWithDispensary> => {
	const { db, collections } = db_namespace;
	return (
		await client
			.db(db)
			.collection(collections.staff)
			.aggregate<StaffMemberWithDispensary>([
				{
					$match: where,
				},
				{
					$lookup: {
						from: 'dispensaries',
						let: { teamSlug: where.teamSlug },
						pipeline: [{ $match: { $expr: { $eq: ['$slug', '$$teamSlug'] } } }],
						as: 'team',
					},
				},
				{
					$unwind: {
						path: '$team',
						preserveNullAndEmptyArrays: true,
					},
				},
				{
					$addFields: {
						teamId: { $toString: '$team._id' },
						teamSlug: '$team.slug',
						'team.id': { $toString: '$team._id' },
					},
				},
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
	return await getStaffMember({ client, where: { id } });
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
	where: Document;
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
}): Promise<StaffMemberWithDispensary[]> => {
	const { db, collections } = db_namespace;
	const staffMembers = await client
		.db(db)
		.collection<StaffMemberWithDispensary>(collections.staff)
		.aggregate<StaffMemberWithDispensary>([
			{
				$match: { teams: where.slug },
			},
			{
				$lookup: {
					from: 'dispensaries',
					let: { teamSlug: where.slug },
					pipeline: [{ $match: { $expr: { $eq: ['$slug', '$$teamSlug'] } } }],
					as: 'team',
				},
			},
			{
				$unwind: {
					path: '$team',
					preserveNullAndEmptyArrays: true,
				},
			},
			{
				$addFields: {
					teamId: { $toString: '$team._id' },
					teamSlug: '$team.slug',
					'team.id': { $toString: '$team._id' },
				},
			},
		])
		.toArray();
	return staffMembers?.map((member) => {
		member = normalizeUser(member);
		return member;
	});
};
