import { type MongoClient, ObjectId } from 'mongodb';
import { db_namespace } from './db';

export const createStripeSubscription = async ({
	client,
	data,
}: {
	client: MongoClient;
	data: NonNullable<Subscription>;
}) => {
	const { db, collections } = db_namespace;
	const subscription = await client
		.db(db)
		.collection<Subscription>(collections.subscriptions)
		.insertOne({
			...data,
		});
	return { ...data, id: subscription.insertedId.toString() };
};

export const deleteStripeSubscription = async ({
	client,
	where,
}: {
	client: MongoClient;
	where: { id: string };
}) => {
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection<Subscription>(collections.subscriptions)
		.deleteOne({ _id: new ObjectId(where.id) });
};

export const updateStripeSubscription = async ({
	client,
	data,
}: {
	client: MongoClient;
	data: any;
}) => {
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection<Subscription>(collections.subscriptions)
		.updateOne(
			{
				_id: new ObjectId(data.id),
			},
			data
		);
};

export const getSubscriptionByCustomerId = async ({
	client,
	where,
}: {
	client: MongoClient;
	where: {
		customerId: string;
	};
}): Promise<Subscription[]> => {
	const { db, collections } = db_namespace;
	return (
		(await client
			.db(db)
			.collection<Subscription>(collections.subscriptions)
			.find({ customerId: where.customerId })
			.toArray()) || []
	);
};

export const getBySubscriptionId = async ({
	client,
	where,
}: {
	client: MongoClient;
	where: {
		subscriptionId: string;
	};
}): Promise<Subscription | null> => {
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection<Subscription>(collections.subscriptions)
		.findOne({ _id: new ObjectId(where.subscriptionId) });
};

export type Subscription = {
	id?: string;
	customerId: string;
	active: boolean;
	startDate: Date;
	endDate: Date;
	priceId: string;
};
