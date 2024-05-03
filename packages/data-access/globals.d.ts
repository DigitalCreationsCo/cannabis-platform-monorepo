/* eslint-disable no-var */
import { type MongoClient } from 'mongodb';

declare global {
	var clientPromise: Promise<MongoClient>;
}
