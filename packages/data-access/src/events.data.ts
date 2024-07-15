/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { type MongoClient } from 'mongodb';
import { db_namespace } from './db';
import { type EventJobLocation, type Event, type EventComment } from './types';
import { getZipcodeLocation } from './zipcode.data';

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
		.insertMany(
			data.map((event) => {
				// Ensure longitude and latitude are numbers
				const longitude = parseFloat(event.primary_venue.address.longitude);
				const latitude = parseFloat(event.primary_venue.address.latitude);

				// Set the location field
				event.primary_venue.address.location = [longitude, latitude];

				return event;
			})
		);
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
					update: {
						$set: {
							...event,
							primary_venue: {
								...event.primary_venue,
								address: {
									...event.primary_venue.address,
									location: [
										parseFloat(event.primary_venue.address.longitude),
										parseFloat(event.primary_venue.address.latitude),
									],
								},
							},
						},
					},
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
		await client
			.db(db)
			.collection<Event>(collections.events)
			.findOneAndUpdate(
				{ id: data.id },
				{
					$set: {
						...data,
						primary_venue: {
							...data.primary_venue,
							address: {
								...data.primary_venue.address,
								location: [
									parseFloat(data.primary_venue.address.longitude),
									parseFloat(data.primary_venue.address.latitude),
								],
							},
						},
					},
				},
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
		await client
			.db(db)
			.collection<Event>(collections.events)
			.findOneAndUpdate(
				where,
				{
					$set: {
						...data,
						primary_venue: {
							...data.primary_venue,
							address: {
								...data.primary_venue.address,
								location: [
									parseFloat(data.primary_venue.address.longitude),
									parseFloat(data.primary_venue.address.latitude),
								],
							},
						},
					},
				},
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

export const createEventComment = async ({
	client,
	where,
	comment,
}: {
	client: MongoClient;
	where: { id: string };
	comment: Omit<EventComment, 'created_at'>;
}) => {
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection<Event>(collections.events)
		.updateOne(where, {
			$push: {
				comments: {
					...comment,
					created_at: new Date().toISOString(),
				},
			},
		});
};

export const getEvent = async ({
	client,
	where,
}: {
	client: MongoClient;
	where: { id: string };
}): Promise<Event | null> => {
	const { db, collections } = db_namespace;
	const event = await client
		.db(db)
		.collection<Event>(collections.events)
		.findOne(where);
	console.info('event found:: ', event);
	return event;
};

export const getEvents = async ({
	client,
	limit = 12,
	zipcode,
	radius = 10000,
}: {
	client: MongoClient;
	limit?: number;
	zipcode: string;
	radius: number;
}): Promise<Event[]> => {
	const { db, collections } = db_namespace;
	const zip = await getZipcodeLocation({ client, where: { zipcode } });
	if (!zip?.loc) {
		return [];
	}
	return await client
		.db(db)
		.collection<Event>(collections.events)
		.aggregate<Event>([
			{
				$geoNear: {
					near: zip.loc,
					distanceField: 'distance',
					maxDistance: Number(radius),
					spherical: true,
				},
			},
			{
				$limit: Number(limit),
			},
			{
				$addFields: {
					// id: { $toString: '$_id' },
					date: { $dateFromString: { dateString: '$start_date' } },
				},
			},
			{
				$sort: {
					end_date: 1,
					start_date: 1,
				},
			},
		])
		.toArray();
};

export const getActiveEvents = async ({
	client,
	limit = 12,
	zipcode,
	radius = 10000,
}: {
	client: MongoClient;
	limit?: number;
	zipcode: string;
	radius: number;
}): Promise<Event[]> => {
	const { db, collections } = db_namespace;
	const zip = await getZipcodeLocation({ client, where: { zipcode } });
	if (!zip?.loc) {
		return [];
	}

	return await client
		.db(db)
		.collection<Event>(collections.events)
		.aggregate<Event>([
			{
				$geoNear: {
					near: zip.loc,
					distanceField: 'distance',
					maxDistance: Number(radius),
					spherical: true,
				},
			},
			{
				$match: {
					end_date: { $gte: new Date().toISOString().split('T')[0] },
				},
			},
			{
				$limit: Number(limit),
			},
			{
				$addFields: {
					// id: { $toString: '$_id' },
					date: { $dateFromString: { dateString: '$start_date' } },
				},
			},
			{
				$sort: {
					end_date: 1,
					start_date: 1,
				},
			},
		])
		.toArray();
};

export const getEventsByTeamSlug = async ({
	client,
	slug,
	limit = 12,
}: {
	client: MongoClient;
	slug: string;
	limit?: number;
}): Promise<Event[]> => {
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection<Event>(collections.events)
		.aggregate<Event>([
			{
				$match: { primary_organizer_slug: slug },
			},
			{
				$limit: Number(limit),
			},
			{
				$addFields: {
					id: { $toString: '$_id' },
					date: { $dateFromString: { dateString: '$start_date' } },
				},
			},
			{
				$sort: {
					end_date: 1,
					start_date: 1,
				},
			},
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

export const getEventJobLocations = async ({
	client,
}: {
	client: MongoClient;
}): Promise<EventJobLocation[]> => {
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection<EventJobLocation>(collections.eventJobLocations)
		.find({}, { projection: { _id: 0 } })
		.toArray();
};

export const addToEventJobLocations = async ({
	client,
	location,
}: {
	client: MongoClient;
	location: string;
}) => {
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection<EventJobLocation>(collections.eventJobLocations)
		.insertOne({ location });
};

// NOT deleting expired events, just hiding them
// export const deleteExpiredEvents = async () => {
// 	const client = await clientPromise;
// 	const { db, collections } = db_namespace;
// 	return await client
// 		.db(db)
// 		.collection<Event>(collections.events)
// 		.deleteMany({ end_date: { $gt: Date.now() } });
// };
