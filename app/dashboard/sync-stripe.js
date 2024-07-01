const Stripe = require('stripe');
const { MongoClient } = require('mongodb');

/**
 * Synchronizes data between a database and the Stripe API.
 * Retrieves active products and prices from Stripe, deletes existing data in the database,
 * and inserts the new data. Prints the number of synced products and prices.
 *
 * @returns {Promise<void>} - A promise that resolves once the synchronization is complete.
 */

const sync = async () => {
	const mongoUri = process.env.NEXT_PUBLIC_MONGODB_CONNECTION_URL;
	if (mongoUri === undefined) {
		throw new Error(
			'NEXT_PUBLIC_MONGODB_CONNECTION_URL environment variable not set'
		);
	}

	if (process.env.NEXT_PUBLIC_GRAS_DB_NS === undefined) {
		throw new Error('NEXT_PUBLIC_GRAS_DB_NS environment variable not set');
	}

	const client = new MongoClient(mongoUri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	try {
		await client.connect();
		console.info('Connected to MongoDB');
		const db = client.db(process.env.NEXT_PUBLIC_GRAS_DB_NS);
		const serviceCollection = db.collection('services');
		const priceCollection = db.collection('prices');

		console.log('Starting sync with Stripe');
		const stripe = getStripeInstance();

		// Get all active products and prices
		const [products, prices] = await Promise.all([
			stripe.products.list({ active: true }),
			stripe.prices.list({ active: true }),
		]);

		if (prices.data.length > 0 && products.data.length > 0) {
			await serviceCollection.deleteMany({});
			await priceCollection.deleteMany({});
			console.info('Deleted services and prices data in the database');

			await seedServices(products.data, serviceCollection);
			console.log(`Inserting ${products.data.length} services`);

			await seedPrices(prices.data, priceCollection);
			console.log(`Inserting ${prices.data.length} prices`);

			console.log('Sync completed successfully');
		} else {
			if (prices.data.length === 0) {
				throw new Error('No prices found on Stripe');
			} else {
				throw new Error('No products found on Stripe');
			}
		}
	} catch (error) {
		console.error('Error syncing with Stripe:', error);
		process.exit(1);
	} finally {
		console.info('DONE');
		await client.close();
		console.log('Disconnected from MongoDB');
		process.exit(0);
	}
};

sync();

// handle uncaught errors
process.on('uncaughtException', (error) => {
	console.error('Uncaught Exception:', error);
	process.exit(1);
});

function getStripeInstance() {
	if (process.env.STRIPE_API_KEY_SECRET) {
		return new Stripe(process.env.STRIPE_API_KEY_SECRET || '', {
			apiVersion: '2022-11-15',
		});
	} else {
		throw new Error('STRIPE_API_KEY_SECRET environment variable not set');
	}
}

async function seedServices(products, collection) {
	for (const data of products) {
		const insert = await collection.insertOne({
			id: data.id,
			description: data.description || '',
			features: (data.features || []).map((a) => a.name),
			image: data.images.length > 0 ? data.images[0] : '',
			name: data.name,
			created: new Date(data.created * 1000),
		});
		console.info('Inserted service, ', insert);
	}
}

async function seedPrices(prices, collection) {
	for (const data of prices) {
		const insert = await collection.insertOne({
			id: data.id,
			billingScheme: data.billing_scheme,
			currency: data.currency,
			serviceId: data.product,
			amount: data.unit_amount ? data.unit_amount / 100 : undefined,
			metadata: data.recurring,
			type: data.type,
			created: new Date(data.created * 1000),
		});
		console.info('Inserted price, ', insert);
	}
}
