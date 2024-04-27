// import {
// 	MongoClient,
// 	ServerApiVersion,
// 	type MongoClientOptions,
// } from 'mongodb';

// // This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb

// if (!process.env.NEXT_PUBLIC_MONGODB_CONNECTION_URL) {
// 	throw new Error(
// 		'Invalid/Missing environment variable: "NEXT_PUBLIC_MONGODB_CONNECTION_URL"',
// 	);
// }

// const uri = process.env.NEXT_PUBLIC_MONGODB_CONNECTION_URL;
// const options: MongoClientOptions = {
// 	serverApi: {
// 		version: ServerApiVersion.v1,
// 		strict: true,
// 		deprecationErrors: true,
// 	},
// };

// let client;
// let clientPromise: Promise<MongoClient>;

// if (process.env.NODE_ENV === 'development') {
// 	// In development mode, use a global variable so that the value
// 	// is preserved across module reloads caused by HMR (Hot Module Replacement).
// 	const globalWithMongo = global as typeof globalThis & {
// 		_mongoClientPromise?: Promise<MongoClient>;
// 	};

// 	if (!globalWithMongo._mongoClientPromise) {
// 		client = new MongoClient(uri, options);
// 		globalWithMongo._mongoClientPromise = client.connect();
// 	}
// 	clientPromise = globalWithMongo._mongoClientPromise;
// } else {
// 	// In production mode, it's best to not use a global variable.
// 	client = new MongoClient(uri, options);
// 	clientPromise = client.connect();
// }

// // Export a module-scoped MongoClient promise. By doing this in a
// // separate module, the client can be shared across functions.
// export default typeof window === 'undefined' ? clientPromise : null;

// const mongoConnectUrl = process.env
// 	.NEXT_PUBLIC_MONGODB_CONNECTION_URL as string;
// const options: MongoClientOptions = {};

// declare global {
// 	// eslint-disable-next-line no-var
// 	var _mongoClientPromise: Promise<MongoClient>;
// }

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

// class Singleton {
// 	private static _instance: Singleton;
// 	private client: MongoClient;
// 	private clientPromise: Promise<MongoClient>;
// 	private constructor() {
// 		this.client = new MongoClient(mongoConnectUrl, options);
// 		this.clientPromise = this.client.connect();
// 		if (process.env.NODE_ENV === 'development') {
// 			// In development mode, use a global variable so that the value
// 			// is preserved across module reloads caused by HMR (Hot Module Replacement).
// 			// global._mongoClientPromise = this.clientPromise;
// 		}
// 	}

// 	public static get instance() {
// 		if (!this._instance) {
// 			this._instance = new Singleton();
// 		}
// 		return this._instance.clientPromise;
// 	}
// }
// const clientPromise = Singleton.instance;

// // Export a module-scoped MongoClient promise. By doing this in a
// // separate module, the client can be shared across functions.
// export default clientPromise;
