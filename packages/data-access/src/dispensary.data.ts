/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { type MongoClient, ObjectId } from 'mongodb';
import { db_namespace } from './db';
import { metersToRadians, EARTH_RADIUS_METERS } from './helpers';
import { addStaffMember } from './staff.data';
import { type Dispensary } from './types/dispensary.types';
import { Role } from './types/role.types';
import { getZipcodeLocation } from './zipcode.data';

export const createDispensary = async ({
	client,
	userId,
	data,
}: {
	client: MongoClient;
	userId: string;
	data: Omit<Dispensary, 'id'>;
}): Promise<Dispensary> => {
	try {
		const { createdAt = new Date(), updatedAt = new Date() } = data;
		const { db, collections } = db_namespace;

		const dispensary = {
			...data,
			id: (
				await client
					.db(db)
					.collection<Partial<Dispensary>>(collections.dispensaries)
					.insertOne({
						...data,
						createdAt,
						updatedAt,
						showInMarketPlace: false,
						siteSetting: {
							title: data.name,
							bannerText: `Shop at ${data.name}`,
							description: '',
							showTitle: true,
							showBanner: true,
							showDescription: true,
							primaryColor: '#111111',
							secondaryColor: '#111111',
							tertiaryColor: '#000000',
							textColor: '#000000',
							backgroundColor: '#ffffff',
						},
					})
			).insertedId.toString(),
		};

		await addStaffMember({ client, dispensary, userId, role: Role.OWNER });

		// await findOrCreateApp(team.name, team.id);

		return dispensary;
	} catch (error) {
		console.log(error);
		return {} as Dispensary;
	}
};

export const getDispensaryByCustomerId = async ({
	client,
	where,
}: {
	client: MongoClient;
	where: {
		billingId: string;
	};
}): Promise<Dispensary | null> => {
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection<Dispensary>(collections.dispensaries)
		.findOne({ billingId: where.billingId });
};

export const getDispensary = async ({
	client,
	where,
}: {
	client: MongoClient;
	where: { id: string } | { slug: string } | any;
}) => {
	Object.hasOwnProperty.call(where, 'id') &&
		(where = { _id: new ObjectId(where.id) });
	const { db, collections } = db_namespace;

	const dispensary = await client
		.db(db)
		.collection<Dispensary>(collections.dispensaries)
		.findOne(where);
	return { ...dispensary, id: dispensary!._id.toString() };
};

export const deleteDispensary = async ({
	client,
	where,
}: {
	client: MongoClient;
	where: { id: string } | { slug: string } | any;
}) => {
	Object.hasOwnProperty.call(where, 'id') &&
		(where = { _id: new ObjectId(where.id) });
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection(collections.dispensaries)
		.deleteOne(where);
};

export const removeStaffMember = async ({
	client,
	where,
}: {
	client: MongoClient;
	where: {
		dispensaryId: string;
		userId: string;
	};
}) => {
	const { db, collections } = db_namespace;
	const deleted = await client
		.db(db)
		.collection(collections.staff)
		.findOneAndDelete({
			dispensaryId: where.dispensaryId,
			_id: new ObjectId(where.userId),
		});
	return deleted.value!;
};

export const getStaffMemberDispensaries = async ({
	client,
	where,
}: {
	client: MongoClient;
	where: { userId: string };
}) => {
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection<Dispensary>(collections.dispensaries)
		.aggregate<Dispensary>([
			{
				$match: { members: where.userId },
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

export async function getDispensaryRoles({
	client,
	where,
}: {
	client: MongoClient;
	where: { userId: string };
}) {
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection(collections.staff)
		.findOne(
			{ _id: new ObjectId(where.userId) },
			{ projection: { role: 1, dispensaryId: 1 } }
		);
}

/**
 *  Check if the user is an admin or owner of the dispensary
 */
export async function isDispensaryAdmin({
	client,
	where,
}: {
	client: MongoClient;
	where: { userId: string; dispensaryId: string };
}) {
	const { db, collections } = db_namespace;
	const staffMember = await client
		.db(db)
		.collection(collections.staff)
		.findOne({
			_id: new ObjectId(where.userId),
			dispensaryId: where.dispensaryId,
		});
	return staffMember?.role === Role.ADMIN || staffMember?.role === Role.OWNER;
}

export const updateDispensary = async ({
	client,
	data,
}: {
	client: MongoClient;
	data: Partial<Dispensary>;
}): Promise<Dispensary> => {
	const { db, collections } = db_namespace;
	const updatedDispensary = await client
		.db(db)
		.collection<Dispensary>(collections.dispensaries)
		.findOneAndUpdate(
			{ slug: data.slug },
			{
				$set: {
					...data,
					showInMarketPlace: data.isSignupComplete
						? true
						: data.showInMarketPlace,
				},
			},
			{ returnDocument: 'after' }
		);
	return {
		...updatedDispensary.value!,
		id: updatedDispensary.value!._id.toString(),
	};
};

export const isTeamExists = async ({
	client,
	where,
}: {
	client: MongoClient;
	where: { slug: string };
}): Promise<number> => {
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection(collections.dispensaries)
		.countDocuments({ slug: where.slug });
};

/**
 * get zero or more Dispensaries
 * @param dispensaryIds string[]
 */
export const getDispensaries = async ({
	client,
	where,
}: {
	client: MongoClient;
	where: { dispensaryIds: string[] };
}) => {
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection(collections.dispensaries)
		.find(where.dispensaryIds.map((id) => ({ _id: new ObjectId(id) })));
};

export async function getDispensariesByLocation({
	client,
	where: { limit = 12, radius = 10000 },
	where,
}: {
	client: MongoClient;
	where: {
		loc: [number, number];
		limit: number;
		radius: number;
	};
}) {
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection(collections.dispensaries)
		.aggregate([
			{
				$geoNear: {
					near: where.loc,
					distanceField: 'distance',
					maxDistance: metersToRadians(Number(radius)),
					distanceMultiplier: EARTH_RADIUS_METERS,
					spherical: true,
				},
			},
			{
				$limit: Number(limit),
			},
			{
				$addFields: {
					distance: '$distance',
				},
			},
			{
				$sort: {
					distance: 1,
				},
			},
		])
		.toArray();
}

export async function getDispensariesByZipcode({
	client,
	zipcode,
	limit,
	radius,
}: {
	client: MongoClient;
	zipcode: string;
	limit: string;
	radius: string;
}): Promise<Required<Dispensary[]>> {
	const zip = await getZipcodeLocation({ client, where: { zipcode } });
	if (!zip?.loc) {
		return [];
	}
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection<Dispensary>(collections.dispensaries)
		.aggregate<Dispensary>([
			{
				$geoNear: {
					near: zip.loc,
					distanceField: 'distance',
					maxDistance: metersToRadians(Number(radius)),
					distanceMultiplier: EARTH_RADIUS_METERS,
					spherical: true,
				},
			},
			{
				$limit: Number(limit),
			},
			{
				$addFields: {
					distance: '$distance',
				},
			},
			{
				$limit: Number(limit),
			},
			{
				$sort: {
					distance: 1,
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
export async function updateDispensaryStripeAccount({
	client,
	data,
}: {
	client: MongoClient;
	data: Dispensary;
}) {
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection(collections.dispensaries)
		.updateOne(
			{ _id: new ObjectId(data.id) },
			{ $set: { stripeAccountId: data.stripeAccountId, ...data } }
		);
}

/**
 * get the stripe account id for an organization using the organization id
 * @param organizationId
 * @returns stripeAccountId
 */
export async function getStripeAccountId({
	client,
	where,
}: {
	client: MongoClient;
	where: { dispensaryId: string };
}) {
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection<Dispensary>(collections.dispensaries)
		.findOne(
			{ _id: new ObjectId(where.dispensaryId) },
			{ projection: { stripeAccountId: 1 } }
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
