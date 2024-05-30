/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { db_namespace, clientPromise } from '../db';
import { type Event } from './event.types';

export const createManyEvents = async (events: Event[]) => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection<Event>(collections.events)
		.insertMany(events);
};

export const updateManyEvents = async (events: Event[]) => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection<Event>(collections.events)
		.bulkWrite(
			events.map((event) => ({
				updateOne: {
					filter: { id: event.id },
					update: { $set: { ...event } },
					upsert: true,
				},
			})),
		);
};

export const createEvent = async (data: Event): Promise<Event> => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	const event = await (
		await client.db(db).collection<Event>(collections.events).findOneAndUpdate(
			{ id: data.id },
			{ $set: data },
			{
				upsert: true,
				returnDocument: 'after',
			},
		)
	).value;
	return {
		...event!,
	};
};

export const updateEvent = async ({
	where,
	data,
}: {
	where: { id: string };
	data: Event;
}): Promise<Event> => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	const event = await (
		await client.db(db).collection<Event>(collections.events).findOneAndUpdate(
			where,
			{ $set: data },
			{
				upsert: true,
				returnDocument: 'after',
			},
		)
	).value;
	return {
		...event!,
	};
};

export const getEvent = async (id: string): Promise<Event | null> => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection<Event>(collections.events)
		.findOne({ id });
};

export const getEvents = async (): Promise<Event[]> => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection<Event>(collections.events)
		.find()
		.limit(24)
		.toArray();
};

export const deleteEvent = async (id: string) => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection<Event>(collections.events)
		.deleteOne({ id });
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
