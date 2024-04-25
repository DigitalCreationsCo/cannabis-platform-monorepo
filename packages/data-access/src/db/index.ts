import { MongoClient, type MongoClientOptions } from 'mongodb';

const mongoConnectUrl = process.env.MONGODB_CONNECTION_URL as string;
const options: MongoClientOptions = {};

console.info('mongoConnectUrl', mongoConnectUrl);
declare global {
	// eslint-disable-next-line no-var
	var _mongoClientPromise: Promise<MongoClient>;
}

export const db_namespace = {
	db: process.env.GRAS_DB_NS as string,
	collections: {
		daily_deals: 'daily_deals',
		dispensaries: 'dispensaries',
		drivers: 'drivers',
		orders: 'orders',
		staff: 'staff',
		users: 'users',
		sessions: 'sessions',
		accounts: 'accounts',
		zipcodes: 'zipcodes',
		subscriptions: 'subscriptions',
		passwordReset: 'passwordReset',
		services: 'services',
		prices: 'prices',
		verificationToken: 'verificationToken',
	},
};

class Singleton {
	private static _instance: Singleton;
	private client: MongoClient;
	private clientPromise: Promise<MongoClient>;
	private constructor() {
		this.client = new MongoClient(mongoConnectUrl, options);
		this.clientPromise = this.client.connect();
		if (process.env.NODE_ENV === 'development') {
			// In development mode, use a global variable so that the value
			// is preserved across module reloads caused by HMR (Hot Module Replacement).
			global._mongoClientPromise = this.clientPromise;
		}
	}

	public static get instance() {
		if (!this._instance) {
			this._instance = new Singleton();
		}
		return this._instance.clientPromise;
	}
}
const clientPromise = Singleton.instance;

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;
