/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { type MongoClient, ObjectId } from 'mongodb';
import { db_namespace } from './db';

export type DailyDeal = {
	id: string;
	title: string;
	message: string;
	startTime: Date | string | null;
	endTime: Date | string | null;
	lastSentAt: Date | string | null;
	doesRepeat: boolean;
	schedule: string;
	timezone: string;
	teamSlug: string;
	isActive: boolean;
	weedTextSegmentId?: string;
	jobId?: string;
};

export const getDailyDeal = async ({
	client,
	where,
}: {
	client: MongoClient;
	where: { slug: string; id: string };
}) => {
	const { db, collections } = db_namespace;
	const deal = await client
		.db(db)
		.collection<DailyDeal>(collections.daily_deals)
		.findOne({ teamSlug: where.slug, _id: new ObjectId(where.id) });
	return { ...deal, id: deal?._id.toString() };
};

export const getDispensaryDailyDeals = async ({
	client,
	where,
}: {
	client: MongoClient;
	where: { slug: string };
}) => {
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection<DailyDeal>(collections.daily_deals)
		.aggregate([
			{
				$match: { teamSlug: where.slug },
			},
			{
				$sort: {
					startTime: -1,
				},
			},
			{
				$addFields: {
					id: { $toString: '$_id' },
				},
			},
		])
		.toArray();
};

export const createDispensaryDailyDeal = async ({
	client,
	data,
}: {
	client: MongoClient;
	data: DailyDeal;
}): Promise<DailyDeal> => {
	const { db, collections } = db_namespace;
	const dailyDeal = await client
		.db(db)
		.collection<DailyDeal>(collections.daily_deals)
		.insertOne(data);
	return { ...data, id: dailyDeal.insertedId.toString() };
};

export const updateDispensaryDailyDeal = async ({
	client,
	data,
}: {
	client: MongoClient;
	data: DailyDeal;
}): Promise<DailyDeal> => {
	const { db, collections } = db_namespace;
	const dailyDeal = await (
		await client
			.db(db)
			.collection<DailyDeal>(collections.daily_deals)
			.findOneAndUpdate(
				{ _id: new ObjectId(data.id), teamSlug: data.teamSlug },
				data,
				{
					returnDocument: 'after',
				},
			)
	).value;
	return { ...data, id: dailyDeal!._id.toString() };
};

export const deleteDispensaryDailyDeal = async ({
	client,
	where,
}: {
	client: MongoClient;
	where: { id: string };
}): Promise<DailyDeal> => {
	const { db, collections } = db_namespace;
	const deletedDailyDeal = await (
		await client
			.db(db)
			.collection<DailyDeal>(collections.daily_deals)
			.findOneAndDelete({ _id: new ObjectId(where.id) })
	).value;
	return { ...deletedDailyDeal!, id: where.id };
};
