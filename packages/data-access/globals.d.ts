/* eslint-disable no-var */
import { type MongoClient } from 'mongodb';

declare global {
	declare var clientPromise: Promise<MongoClient>;
}
