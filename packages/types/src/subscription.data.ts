import { ObjectId } from 'mongodb';
import clientPromise, { db_namespace } from './db';

export const createStripeSubscription = async (data: {
	customerId: string;
	_id: string;
	active: boolean;
	startDate: Date;
	endDate: Date;
	priceId: string;
}) => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection<Subscription>(collections.subscriptions)
		.insertOne({
			...data,
			_id: new ObjectId(data._id),
		});
};

export const deleteStripeSubscription = async (id: string) => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection<Subscription>(collections.subscriptions)
		.deleteOne({ _id: new ObjectId(id) });
};

export const updateStripeSubscription = async (id: string, data: any) => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection<Subscription>(collections.subscriptions)
		.updateOne(
			{
				_id: new ObjectId(id),
			},
			data,
		);
};

export const getByCustomerId = async (customerId: string) => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection<Subscription>(collections.subscriptions)
		.findOne({ customerId });
};

export const getBySubscriptionId = async (
	subscriptionId: string,
): Promise<Subscription | null> => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection<Subscription>(collections.subscriptions)
		.findOne({ _id: new ObjectId(subscriptionId) });
};

export type Subscription = {
	_id: ObjectId;
	customerId: string;
	active: boolean;
	startDate: Date;
	endDate: Date;
	priceId: string;
};
