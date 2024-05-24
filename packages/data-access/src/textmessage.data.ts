/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ObjectId } from 'mongodb';
import { db_namespace, clientPromise } from './db';

export type DailyDeal = {
	id: string;
	title: string;
	description: string;
	// price: number;
	// quantity: number;
	isExpired: boolean;
	startTime: Date;
	teamSlug: string;
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
