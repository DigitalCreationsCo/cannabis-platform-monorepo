import { createHash, randomBytes } from 'crypto';
import { type MongoClient, ObjectId } from 'mongodb';
import { db_namespace } from './db';

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

export const createApiKey = async ({
	client,
	data,
}: {
	client: MongoClient;
	data: CreateApiKeyParams;
}) => {
	const { name, teamId } = data;

	const [hashedKey, apiKey] = generateUniqueApiKey();

	const { db, collections } = db_namespace;
	await client
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

export const fetchApiKeys = async ({
	client,
	where,
}: {
	client: MongoClient;
	where: { teamId: string };
}) => {
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection<ApiKey>(collections.apiKey)
		.find({ teamId: new ObjectId(where.teamId) });
};

export const deleteApiKey = async ({
	client,
	where,
}: {
	client: MongoClient;
	where: { id: string };
}) => {
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection(collections.apiKey)
		.deleteOne({ _id: new ObjectId(where.id) });
};

export const getApiKey = async ({
	client,
	where,
}: {
	client: MongoClient;
	where: { apiKey: string };
}) => {
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection<ApiKey>(collections.apiKey)
		.findOne({ hashedKey: hashApiKey(where.apiKey) });
};

export interface ApiKey {
	id: string;
	teamId: ObjectId;
	name: string;
	hashedKey: string;
	createdAt: Date;
	updatedAt: Date;
}
