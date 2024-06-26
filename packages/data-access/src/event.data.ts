/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { type MongoClient } from 'mongodb';
import { db_namespace } from './db';
import { type Event } from './types';
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
		  		}
			)
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
					update: { $set: 
						{ 
							...event,
							"primary_venue.address.location": [
								{ $toDouble: "$primary_venue.address.longitude" },
								{ $toDouble: "$primary_venue.address.latitude" }
						  	] 
						} 
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
		await client.db(db).collection<Event>(collections.events).findOneAndUpdate(
			{ id: data.id },
			{ $set: 
				{
					...data,
					"primary_venue.address.location": [
					parseFloat(data.primary_venue.address.longitude),
					parseFloat(data.primary_venue.address.latitude)
					]
				} 
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
		await client.db(db).collection<Event>(collections.events).findOneAndUpdate(
			where,
			{ $set: {
				...data,
				"primary_venue.address.location": [
					parseFloat(data.primary_venue.address.longitude),
					parseFloat(data.primary_venue.address.latitude)
					]
				}  
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
	zipcode,
	radius = 10000,
}: {
	client: MongoClient;
	limit?: number;
	zipcode: string;
	radius: number;
}): Promise<Event[]> => {
	const { db, collections } = db_namespace;
	console.info('zipcode, ', zipcode)
	const zip = await getZipcodeLocation({ client, where: { zipcode: '10011' } });
	if (!zip?.loc) {
		console.info('zip, ', zip)
		return [];
	}
	console.info('zip, ', zip)
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
			// { $sort: { date: 1,
			// 	distance: 1,
			// } },
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
