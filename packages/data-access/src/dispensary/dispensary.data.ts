/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ObjectId, type WithId, type UpdateFilter } from 'mongodb';
import { db_namespace } from '../db';
import { normalizeUser } from '../helpers';
import { Role } from '../role.types';
import { addStaffMember } from '../staff/staff.data';
import { type StaffMember } from '../staff/staff.types';
import { type Dispensary } from './dispensary.types';

export const createDispensary = async ({
	createdAt = new Date(),
	updatedAt = new Date(),
	...param
}: { userId: string } & NonNullable<
	Omit<Dispensary, 'id'>
>): Promise<Dispensary> => {
	try {
		const { userId, ...data } = param;
		const client = await clientPromise;
		const { db, collections } = db_namespace;
		const dispensary = (await (
			await client
				.db(db)
				.collection<Dispensary>(collections.dispensaries)
				.findOneAndUpdate(
					{ slug: param.slug },
					{ ...data, createdAt, updatedAt },
					{ upsert: true, returnDocument: 'after' },
				)
		).value) as WithId<Dispensary>;

		await addStaffMember(dispensary, userId, Role.OWNER);

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

export const getDispensary = async (key: { id: string } | { slug: string }) => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection<Dispensary>(collections.dispensaries)
		.findOne(key);
};

export const deleteDispensary = async (
	key: { id: string } | { slug: string },
) => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection(collections.dispensaries)
		.deleteOne(key);
};

export const removeStaffMember = async (
	dispensaryId: string,
	userId: string,
) => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection(collections.staff)
		.deleteOne({ dispensaryId, _id: new ObjectId(userId) });
};

export const getStaffMemberDispensary = async (userId: string) => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	const dispensaryId = await client
		.db(db)
		.collection<StaffMember>(collections.staff)
		.findOne({ _id: new ObjectId(userId) }, { projection: { teamId: 1 } });
	return await client
		.db(db)
		.collection(collections.dispensaries)
		.findOne({ _id: new ObjectId(dispensaryId?.teamId) });
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
		.collection(collections.staff)
		.find({ 'dispensary.slug': slug });

	return staffMembers?.map((member) => {
		member = normalizeUser(member);
		return member;
	});
};

export const updateDispensary = async (
	slug: string,
	update: UpdateFilter<Dispensary>,
) => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection(collections.dispensaries)
		.updateOne({ slug }, update);
};

export const isTeamExists = async (slug: string) => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection(collections.dispensaries)
		.countDocuments({ slug });
};

export const getStaffMember = async (userId: string, slug: string) => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection<StaffMember>(collections.staff)
		.findOne({ 'team.slug': slug, _id: new ObjectId(userId) });
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
