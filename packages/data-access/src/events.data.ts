/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { type UpdateFilter, type MongoClient } from 'mongodb';
import { db_namespace } from './db';
import { metersToRadians, EARTH_RADIUS_METERS } from './helpers';
import {
	type EventJobLocation,
	type Event,
	type EventComment,
	type Attendee,
} from './types';
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
		.aggregate<Event>([
			{
				$documents: data, // This stage is available in MongoDB 5.1+
			},
			{
				$addFields: {
					external_id: '$eventbrite_event_id',
					id: '$_id',
					'primary_venue.address.location': {
						$cond: {
							if: {
								$and: [
									{
										$isNumber: {
											$toDouble: '$primary_venue.address.longitude',
										},
									},
									{
										$isNumber: { $toDouble: '$primary_venue.address.latitude' },
									},
								],
							},
							then: [
								{ $toDouble: '$primary_venue.address.longitude' },
								{ $toDouble: '$primary_venue.address.latitude' },
							],
							else: null,
						},
					},
					is_new: true,
				},
			},
			{
				$merge: {
					into: collections.events, // Replace with your actual collection name
					on: 'external_id', // Specify the field to match on
					whenMatched: 'merge', // This will update existing documents
					whenNotMatched: 'insert', // This will insert new documents
				},
			},
		]);
	// .insertMany(
	// 	data.map((event) => {
	// 		event.externalId = event.id;

	// 		// Ensure longitude and latitude are numbers
	// 		const longitude = parseFloat(event.primary_venue.address.longitude);
	// 		const latitude = parseFloat(event.primary_venue.address.latitude);

	// 		// Set the location field
	// 		event.primary_venue.address.location = [longitude, latitude];

	// 		// TTL index 2 weeks
	// 		event.is_new = true;

	// 		return event;
	// 	},
	// );
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
						$setOnInsert: {
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
							is_new: true, // TTL index 2 weeks
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
						is_new: true, // TTL index 2 weeks
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
					$setOnInsert: {
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
						is_new: true, // TTL index 2 weeks
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
					// id: { $toString: '$_id' },
					date: { $dateFromString: { dateString: '$start_date' } },
					distance: '$distance',
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

export const getNewEvents = async ({
	client,
	limit = 3,
	zipcode = '10011',
}: {
	client: MongoClient;
	limit?: number;
	zipcode: string;
}) => {
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection<Event>(collections.events)
		.aggregate<Event>([
			{ $match: { is_new: true } },
			{
				$geoNear: {
					near: zipcode,
					distanceField: 'distance',
					spherical: true,
				},
			},
			{
				$limit: Number(limit),
			},
			{
				$addFields: {
					date: { $dateFromString: { dateString: '$start_date' } },
					distance: '$distance',
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
					maxDistance: metersToRadians(Number(radius)),
					distanceMultiplier: EARTH_RADIUS_METERS,
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
					distance: '$distance',
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

export const addEventAttendee = async ({
	client,
	where,
	attendee,
}: {
	client: MongoClient;
	where: { eventId: string };
	attendee: Attendee;
}) => {
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection<Event>(collections.events)
		.updateOne(
			{ id: where.eventId },
			{
				$push: {
					attendees: {
						$each: [attendee],
					},
				},
				$setOnInsert: {
					attendees: [],
				},
			}
		);
};

export const updateEventAttendee = async ({
	client,
	where,
	attendee,
}: {
	client: MongoClient;
	where: { eventId: string };
	attendee: UpdateFilter<Attendee>;
}): Promise<void> => {
	const { db, collections } = db_namespace;
	await await client
		.db(db)
		.collection<Event>(collections.events)
		.findOneAndUpdate(
			{
				id: where.eventId,
				'attendees.id': attendee.id,
			},
			{
				$set: {
					'attendees.$': attendee,
				},
			}
		);
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
