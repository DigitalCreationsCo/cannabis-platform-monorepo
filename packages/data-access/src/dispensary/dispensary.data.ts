/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ObjectId, type WithId, type UpdateFilter } from 'mongodb';
import { db_namespace, clientPromise } from '../db';
import { normalizeUser } from '../helpers';
import { Role } from '../role.types';
import { addStaffMember } from '../staff/staff.data';
import { type StaffMemberWithUser } from '../staff/staff.types';
import { getZipcodeLocation } from '../zipcode.data';
import { type Dispensary } from './dispensary.types';

export const createDispensary = async ({
	createdAt = new Date(),
	updatedAt = new Date(),
	...param
}: { userId: string } & NonNullable<
	Omit<Dispensary, 'id'>
>): Promise<Dispensary> => {
	try {
		console.trace('create Dispensary: ', param);
		const { userId } = param;
		const client = await clientPromise;
		const { db, collections } = db_namespace;
		const dispensary = (await (
			await client
				.db(db)
				.collection<Dispensary>(collections.dispensaries)
				.findOneAndUpdate(
					{ slug: param.slug },
					{
						$set: { ...param, createdAt, updatedAt },
					},
					{ upsert: true, returnDocument: 'after' },
				)
		).value) as WithId<Dispensary>;
		dispensary.id = dispensary._id.toString();

		console.info('dispensary: ', dispensary);

		await addStaffMember(dispensary, userId, Role.OWNER);

		if (param.isSubscribedForMessaging) {
			// CREATE SLICKTEXT LIST
			// CREATE SLICKTEXT LIST
			// CREATE SLICKTEXT LIST
			// CREATE SLICKTEXT LIST
		}

		// await findOrCreateApp(team.name, team.id);

		return dispensary;
	} catch (error) {
		console.log(error);
		return {} as Dispensary;
	}
};

export const getDispensaryByCustomerId = async (
	billingId: string,
): Promise<Dispensary | null> => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection<Dispensary>(collections.dispensaries)
		.findOne({ billingId });
};

export const getDispensary = async (
	where: { id: string } | { slug: string } | any,
) => {
	Object.hasOwnProperty.call(where, 'id') &&
		(where = { _id: new ObjectId(where.id) });
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	const dispensary = await client
		.db(db)
		.collection<Dispensary>(collections.dispensaries)
		.findOne(where);

	console.trace('dispensary: ', dispensary);
	return { ...dispensary, id: dispensary!._id.toString() };
};

export const deleteDispensary = async (
	where: { id: string } | { slug: string } | any,
) => {
	Object.hasOwnProperty.call(where, 'id') &&
		(where = { _id: new ObjectId(where.id) });
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection(collections.dispensaries)
		.deleteOne(where);
};

export const removeStaffMember = async (
	dispensaryId: string,
	userId: string,
) => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	const deleted = await client
		.db(db)
		.collection(collections.staff)
		.findOneAndDelete({ dispensaryId, _id: new ObjectId(userId) });
	return deleted.value!;
};

export const getStaffMemberDispensaries = async (userId: string) => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;

	return await client
		.db(db)
		.collection<Dispensary>(collections.dispensaries)
		.aggregate<Dispensary>([
			{
				$match: { members: userId },
			},
			{
				$addFields: {
					id: { $toString: '$_id' },
					_count: { members: { $size: '$members' } },
				},
			},
		])
		.toArray();
};

export async function getDispensaryRoles(userId: string) {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection(collections.staff)
		.findOne(
			{ _id: new ObjectId(userId) },
			{ projection: { role: 1, dispensaryId: 1 } },
		);
}

/**
 *  Check if the user is an admin or owner of the dispensary
 */
export async function isDispensaryAdmin(userId: string, dispensaryId: string) {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	const staffMember = await client
		.db(db)
		.collection(collections.staff)
		.findOne({ _id: new ObjectId(userId), dispensaryId });

	return staffMember?.role === Role.ADMIN || staffMember?.role === Role.OWNER;
}

export const getStaffMembers = async (slug: string) => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	const staffMembers = await client
		.db(db)
		.collection<StaffMemberWithUser>(collections.staff)
		.aggregate<StaffMemberWithUser>([
			{
				$match: { 'team.slug': slug },
			},
			{
				$lookup: {
					from: collections.users,
					localField: '_id',
					foreignField: '_id',
					as: 'user',
				},
			},
			{
				$unwind: '$user',
			},
		])
		.toArray();
	console.trace('staffMembers: ', staffMembers);

	return staffMembers?.map((member) => {
		member = normalizeUser(member);
		return member;
	});
};

export const updateDispensary = async (
	slug: string,
	update: UpdateFilter<Dispensary>,
): Promise<Dispensary> => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	const updatedDispensary = await client
		.db(db)
		.collection<Dispensary>(collections.dispensaries)
		.findOneAndUpdate({ slug }, { $set: update }, { returnDocument: 'after' });
	return {
		...updatedDispensary.value!,
		id: updatedDispensary.value!._id.toString(),
	};
};

export const isTeamExists = async (slug: string): Promise<number> => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection(collections.dispensaries)
		.countDocuments({ slug });
};

export const getStaffMember = async (
	userId: string,
	slug: string,
): Promise<StaffMemberWithUser> => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	return (
		await client
			.db(db)
			.collection(collections.staff)
			.aggregate<StaffMemberWithUser>([
				{
					$match: { 'team.slug': slug, userId },
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
			])
			.toArray()
	)[0];
};

/**
 * get zero or more Dispensaries
 * @param dispensaryIds string[]
 */
export const getDispensaries = async (dispensaryIds: string[]) => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection(collections.dispensaries)
		.find(dispensaryIds.map((id) => ({ _id: new ObjectId(id) })));
};

export async function getDispensariesByLocation(
	loc: [number, number],
	limit: number,
	radius: number,
) {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection(collections.dispensaries)
		.aggregate([
			{
				$geoNear: {
					near: loc,
					distanceField: 'distanceFromLoc',
					maxDistance: radius,
					spherical: true,
				},
			},
			{
				$sort: {
					distanceFromLoc: 1,
				},
			},
		])
		.toArray();
}

export async function getDispensariesByZipcode({
	zipcode,
	limit,
	radius,
}: any): Promise<Required<Dispensary[]>> {
	const zip = await getZipcodeLocation(zipcode);

	if (!zip?.loc) {
		return [];
	}
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection<Dispensary>(collections.dispensaries)
		.aggregate<Dispensary>([
			{
				$geoNear: {
					near: zip.loc,
					distanceField: 'distance',
					maxDistance: Number(radius),
					spherical: true,
				},
			},
			{
				$sort: {
					distance: 1,
				},
			},
			{
				$limit: Number(limit),
			},
		])
		.toArray();
}

/**
 * Adds stripe account id to organization record
 * @param id organization id
 * @param stripeAccountId stripe account id
 * @param accountParams additional params to update
 */
export async function updateDispensaryStripeAccount(
	id: string,
	stripeAccountId: string,
	accountParams: Dispensary,
) {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection(collections.dispensaries)
		.updateOne(
			{ _id: new ObjectId(id) },
			{ $set: { stripeAccountId, ...accountParams } },
		);
}

/**
 * get the stripe account id for an organization using the organization id
 * @param organizationId
 * @returns stripeAccountId
 */
export async function getStripeAccountId(dispensaryId: string) {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection<Dispensary>(collections.dispensaries)
		.findOne(
			{ _id: new ObjectId(dispensaryId) },
			{ projection: { stripeAccountId: 1 } },
		);
}

/**
 * Return a url-friendly string
 * @param input string
 * @returns a lowercased string with all non-url-friendly characters removed, and spaces replaced with dashes
 */
export function makeUrlFriendly(input: string) {
	const replaceNonUrlFriendly = /[^\w\-.~ ]/g;
	const urlFriendlyString = input.replace(replaceNonUrlFriendly, '');
	return urlFriendlyString.replace(/ /g, '-').toLowerCase();
	// 	const replaceNonUrlFriendly = /[^\w\-.~]/g;
	// 	return input.replace(replaceNonUrlFriendly, '');
	// }
}
