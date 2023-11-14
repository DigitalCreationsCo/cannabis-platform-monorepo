import prisma from '@cd/data-access';
import { MongoClient } from 'mongodb';
import { DriverDA, ShopDA } from './api/data-access';
import server from './server';

const port = process.env.SERVER_PORT || 6001;
const mongoConnectUrl = process.env.MONGODB_CONNECTION_URL;

connectDb()
	.then(() => {
		server.listen(port, () => {
			console.info(` >> server-main is listening on port ${port}.`);
		});
	})
	.catch((err) => {
		console.error('Error connecting to database: ', err.stack);
		process.exit(1);
	});

async function connectDb() {
	try {
		console.info(` >> server-main starting in ${process.env.NODE_ENV} mode.`);
		await MongoClient.connect(mongoConnectUrl)
			.then(async (client) => {
				await ShopDA.useMongoDB(client);
				await DriverDA.useMongoDB(client);
				console.info(' >> server-mdain: Mongo Database 👏 is ready for query.');

				await prisma.$connect();
			})
			.then(async () => {
				console.info(
					' >> server-main: Prisma Database 👏👏 is ready for query.',
				);
			})
			.then(() => console.info(' >> server-main is connected to database.'));
	} catch (error: any) {
		console.error(
			' >> server-main: Error connecting to database: ',
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
		.catch((error: any) => {
			console.info('sigint ', error.message);
			process.exit(1);
		});
});

export { connectDb, server };
