import { createHash, randomBytes } from 'crypto';
import { ObjectId } from 'mongodb';
import { db_namespace, clientPromise } from './db';

interface CreateApiKeyParams {
	name: string;
	teamId: string;
}

const hashApiKey = (apiKey: string) => {
	return createHash('sha256').update(apiKey).digest('hex');
};

const generateUniqueApiKey = () => {
	const apiKey = randomBytes(16).toString('hex');

	return [hashApiKey(apiKey), apiKey];
};

export const createApiKey = async (params: CreateApiKeyParams) => {
	const { name, teamId } = params;

	const [hashedKey, apiKey] = generateUniqueApiKey();

	const client = await clientPromise;
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection(collections.apiKey)
		.insertOne({
			name,
			hashedKey,
			teamId: new ObjectId(teamId),
			createdAt: new Date(),
			updatedAt: new Date(),
		});

	return apiKey;
};

export const fetchApiKeys = async (teamId: string) => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection<ApiKey>(collections.apiKey)
		.find({ teamId: new ObjectId(teamId) });
};

export const deleteApiKey = async (id: string) => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection(collections.apiKey)
		.deleteOne({ _id: new ObjectId(id) });
};

export const getApiKey = async (apiKey: string) => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection<ApiKey>(collections.apiKey)
		.findOne({ hashedKey: hashApiKey(apiKey) });
};

export type ApiKey = {
	id: string;
	teamId: ObjectId;
	name: string;
	hashedKey: string;
	createdAt: Date;
	updatedAt: Date;
};
