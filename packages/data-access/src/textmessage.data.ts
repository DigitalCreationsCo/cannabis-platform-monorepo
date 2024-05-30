/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ObjectId } from 'mongodb';
import { db_namespace, clientPromise } from './db';

export type DailyDeal = {
	id: string;
	title: string;
	message: string;
	startTime: Date | string | null;
	endTime: Date | string | null;
	doesRepeat: boolean;
	schedule: string;
	timezone: string;
	teamSlug: string;
	isActive: boolean;
	slickTextTextwordId?: string;
	slickTextSegmentId?: string;
	jobId?: string;
};

export const getDailyDeal = async (slug: string, id: string) => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection<DailyDeal>(collections.daily_deals)
		.findOne({ teamSlug: slug, _id: new ObjectId(id) });
};

export const getDispensaryDailyDeals = async (slug: string) => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection<DailyDeal>(collections.daily_deals)
		.find({ teamSlug: slug })
		.toArray();
};

export const createDispensaryDailyDeal = async (
	deal: DailyDeal,
): Promise<DailyDeal> => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	const dailyDeal = await client
		.db(db)
		.collection<DailyDeal>(collections.daily_deals)
		.insertOne(deal);
	return { ...deal, id: dailyDeal.insertedId.toString() };
};

export const updateDispensaryDailyDeal = async (
	deal: DailyDeal,
): Promise<DailyDeal> => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	const dailyDeal = await (
		await client
			.db(db)
			.collection<DailyDeal>(collections.daily_deals)
			.findOneAndUpdate(
				{ _id: new ObjectId(deal.id), teamSlug: deal.teamSlug },
				deal,
				{
					returnDocument: 'after',
				},
			)
	).value;
	return { ...deal, id: dailyDeal!._id.toString() };
};

export const deleteDispensaryDailyDeal = async (
	id: string,
): Promise<DailyDeal> => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	const deletedDailyDeal = await (
		await client
			.db(db)
			.collection<DailyDeal>(collections.daily_deals)
			.findOneAndDelete({ _id: new ObjectId(id) })
	).value;
	return { ...deletedDailyDeal!, id: deletedDailyDeal!._id.toString() };
};
