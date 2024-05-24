import { db_namespace, clientPromise } from './db';

export const getZipcodeLocation = async (zipcode: string) => {
	const client = await clientPromise;
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
		.findOne({ _id: zipcode.toString() });
};
