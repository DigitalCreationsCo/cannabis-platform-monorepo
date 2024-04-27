import { ObjectId } from 'mongodb';
import clientPromise, { db_namespace } from './db';

export const getAllPrices = async () => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	return await client.db(db).collection(collections.prices).find({});
};

export const getServiceByPriceId = async (priceId: string) => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection(collections.prices)
		.find(
			{ _id: new ObjectId(priceId) },
			{
				projection: { service: 1 },
			},
		);
};
