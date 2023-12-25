import prisma from '@cd/data-access';
import { MongoClient } from 'mongodb';
import { LocationDA } from './api/data-access';
import server from './server';

const port = process.env.SERVER_PORT || 6011;
const mongoConnectUrl = process.env.MONGODB_CONNECTION_URL;

connectDb()
	.then(() => {
		console.info(
			` ✈️ Server-Location starting in ${process.env.NODE_ENV} mode.`,
		);
		server.listen(port, () => {
			console.info(` ✈️ Server-Location listening on port ${port}.`);

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
		prisma.$disconnect();
		console.error('Error connecting to database: ', err.stack);
		process.exit(1);
	});

async function connectDb() {
	try {
		await MongoClient.connect(mongoConnectUrl)
			.then(async (client) => {
				await LocationDA.useMongoDB(client);
				console.info(
					' ✈️ Server-Location: Mongo Database 👏 is ready for query.',
				);
				await prisma.$connect();
			})
			.then(async () => {
				console.info(
					' ✈️ Server-Location: Prisma Database 👏👏 is ready for query.',
				);
			})
			.then(() =>
				console.info(' ✈️ server-location is connected to database.'),
			);
	} catch (error: any) {
		console.error(
			' ✈️ server-location: Error connecting to database: ',
			error.stack,
		);
		prisma.$disconnect();
		process.exit(1);
	}
}

process.on('SIGINT', async function () {
	await prisma
		.$disconnect()
		.then(process.exit(0))
		.catch((error: any) => process.exit(1));
});

export { connectDb, server };
