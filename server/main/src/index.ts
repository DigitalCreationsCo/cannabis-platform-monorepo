import prisma from '@cd/data-access';
import { MongoClient } from 'mongodb';
import { DriverDA, ShopDA } from './api/data-access';
import { initializeRedis } from './lib/redis-cart';
import server from './server';

const port = process.env.SERVER_PORT || 6001;
const mongoConnectUrl = process.env.MONGODB_CONNECTION_URL;

connectDb()
	.then(() => {
		initializeRedis();

		server.listen(port, () => {
			console.info(
				` >> Server-Main is starting in ${process.env.NODE_ENV} mode.`,
			);
			console.info(` >> Server-Main is listening on port ${port}.`);

			// measure cpu usage
			const startCpuUsage = process.cpuUsage();
			const now = Date.now();
			while (Date.now() - now < 1000);
			console.info(
				` 
 CPU Usage:`,
				process.cpuUsage(startCpuUsage),
			);

			// measure memory usage
			console.info(
				` 
 Memory Usage:`,
				process.memoryUsage(),
			);
		});
	})
	.catch((err) => {
		console.error('Error connecting to database: ', err.stack);
		process.exit(1);
	});

process.on('SIGINT', async function () {
	await prisma
		.$disconnect()
		.then(process.exit(0))
		.catch((error: any) => {
			console.info('sigint ', error.message);
			process.exit(1);
		});
});

async function connectDb() {
	try {
		console.info(' >> Server-Main is connecting to database...');
		await MongoClient.connect(mongoConnectUrl)
			.then(async (client) => {
				await ShopDA.useMongoDB(client);
				await DriverDA.useMongoDB(client);
				console.info(' >> Server-Main: Mongo Database 👏 is ready for query.');
			})
			.then(async () => {
				await prisma.$connect();
				console.info(
					' >> Server-Main: Prisma Database 👏👏 is ready for query.',
				);
			});
	} catch (error: any) {
		console.error(
			' >> Server-Main: Error connecting to database: ',
			error.stack,
		);
		prisma.$disconnect();
		process.exit(1);
	}
}

export { connectDb, server };
