import { type MongoClient } from 'mongodb';
import { db_namespace } from './db';

export const getZipcodeLocation = async ({
	client,
	where,
}: {
	client: MongoClient;
	where: { zipcode: string };
}) => {
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection<{
			_id: string;
			city: string;
			loc: [number, number];
			pop: number;
			state: string;
		}>(collections.zipcodes)
		.findOne({ _id: where.zipcode.toString() });
};
