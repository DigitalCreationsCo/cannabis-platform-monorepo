import clientPromise, { db_namespace } from './db';

export const createVerificationToken = async ({
	token,
	identifier,
	expires,
}) => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection(collections.verificationToken)
		.insertOne({
			identifier,
			expires,
			token,
		});
};

export const getVerificationToken = async (token: string) => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection(collections.verificationToken)
		.findOne({
			token: decodeURIComponent(token),
		});
};

export const deleteVerificationToken = async (token: string) => {
	const client = await clientPromise;
	const { db, collections } = db_namespace;
	return await client
		.db(db)
		.collection(collections.verificationToken)
		.deleteOne({
			token,
		});
};

export const isVerificationTokenExpired = (
	verificationToken: VerificationToken,
) => {
	return verificationToken.expires < new Date();
};

export type VerificationToken = {
	identifier: string;
	token: string;
	expires: Date;
};
