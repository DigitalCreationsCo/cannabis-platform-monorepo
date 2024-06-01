/* eslint-disable prefer-const */
import {
  MongoClient,
  ServerApiVersion,
  type MongoClientOptions,
} from 'mongodb';

let client: MongoClient;
let clientPromise: Promise<MongoClient>;
try {
  // This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
  if (!process.env.NEXT_PUBLIC_MONGODB_CONNECTION_URL) {
    throw new Error(
      'Invalid/Missing environment variable: "NEXT_PUBLIC_MONGODB_CONNECTION_URL"'
    );
  }

  const uri = process.env.NEXT_PUBLIC_MONGODB_CONNECTION_URL;
  const options: MongoClientOptions = {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  };

  if (process.env.NODE_ENV === 'development') {
    const globalWithMongo = global as typeof globalThis & {
      _mongoClientPromise: Promise<MongoClient>;
    };

    if (!globalWithMongo._mongoClientPromise) {
      client = new MongoClient(uri, options);
      globalWithMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise;
  } else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
} catch (error) {
  console.error('Error connecting to MongoDB');
  console.error(error.message);
}

export { clientPromise };
