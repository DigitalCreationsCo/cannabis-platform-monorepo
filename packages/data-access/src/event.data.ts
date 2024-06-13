/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { type MongoClient } from 'mongodb';
import { db_namespace } from './db';
import { type Event } from './types';

export const createManyEvents = async ({
	client,
	data,
}: {
	client: MongoClient;
	data: Event[];
}) => {
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection<Event>(collections.events)
		.insertMany(data);
};

export const updateManyEvents = async ({
	client,
	data,
}: {
	client: MongoClient;
	data: Event[];
}) => {
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection<Event>(collections.events)
		.bulkWrite(
			data.map((event) => ({
				updateOne: {
					filter: { id: event.id },
					update: { $set: { ...event } },
					upsert: true,
				},
			}))
		);
};

export const createEvent = async ({
	client,
	data,
}: {
	client: MongoClient;
	data: Event;
}): Promise<Event> => {
	const { db, collections } = db_namespace;
	const event = await (
		await client.db(db).collection<Event>(collections.events).findOneAndUpdate(
			{ id: data.id },
			{ $set: data },
			{
				upsert: true,
				returnDocument: 'after',
			}
		)
	).value;
	return {
		...event!,
	};
};

export const updateEvent = async ({
	client,
	where,
	data,
}: {
	client: MongoClient;
	where: { id: string };
	data: Event;
}): Promise<Event> => {
	const { db, collections } = db_namespace;
	const event = await (
		await client.db(db).collection<Event>(collections.events).findOneAndUpdate(
			where,
			{ $set: data },
			{
				upsert: true,
				returnDocument: 'after',
			}
		)
	).value;
	return {
		...event!,
	};
};

export const getEvent = async ({
	client,
	where,
}: {
	client: MongoClient;
	where: { id: string };
}): Promise<Event | null> => {
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection<Event>(collections.events)
		.findOne(where);
};

export const getEvents = async ({
	client,
	limit = 12,
}: {
	client: MongoClient;
	limit?: number;
}): Promise<Event[]> => {
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection<Event>(collections.events)
		.aggregate<Event>([
			{
				$limit: limit,
			},
			{
				$addFields: {
					id: { $toString: '$_id' },
					date: { $dateFromString: { dateString: '$start_date' } },
				},
			},
			{ $sort: { date: 1 } },
		])
		.toArray();
};

export const deleteEvent = async ({
	client,
	where,
}: {
	client: MongoClient;
	where: { id: string };
}) => {
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection<Event>(collections.events)
		.deleteOne(where);
};

// Currently using Mongo TTL index to expire events
// export const deleteExpiredEvents = async () => {
// 	const client = await clientPromise;
// 	const { db, collections } = db_namespace;
// 	return await client
// 		.db(db)
// 		.collection<Event>(collections.events)
// 		.deleteMany({ end_date: { $gt: Date.now() } });
// };
