/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { type MongoClient } from 'mongodb';
import { db_namespace } from './db';

export const createVerificationToken = async ({
	client,
	token,
	identifier,
	expires,
}: {
	client: MongoClient;
	token: string;
	identifier: any;
	expires: any;
}) => {
	const { db, collections } = db_namespace;
	await client.db(db).collection(collections.verificationToken).insertOne({
		identifier,
		expires,
		token,
	});
	return { token, identifier, expires };
};

export const getVerificationToken = async ({
	client,
	token,
}: {
	client: MongoClient;
	token: string;
}) => {
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection<VerificationToken>(collections.verificationToken)
		.findOne({
			token: decodeURIComponent(token),
		});
};

export const deleteVerificationToken = async ({
	client,
	token,
}: {
	client: MongoClient;
	token: string;
}) => {
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection(collections.verificationToken)
		.deleteOne({
			token,
		});
};

export const isVerificationTokenExpired = (
	verificationToken: VerificationToken
) => {
	return verificationToken.expires < new Date();
};

export interface VerificationToken {
	identifier: string;
	token: string;
	expires: Date;
}
