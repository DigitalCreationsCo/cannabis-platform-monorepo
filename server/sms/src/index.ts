import { axios } from '@cd/core-lib';
import prisma from '@cd/data-access';
import server from './server';

const port = process.env.SERVER_PORT || 6051;

pingSupertokens()
	.then(() => connectDb())
	.then(() => {
		runWeedTextDailyDealScheduledJob();

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

async function pingSupertokens() {
	try {
		await axios(process.env.SUPERTOKENS_CONNECTION_URI + '/hello');
		console.info(' >> Server-Main: Supertokens 👏 is ready for query.');
	} catch (error) {
		console.error('pingSupertokens: ', error.message);
		process.exit(1);
	}
}

async function connectDb() {
	try {
		console.info(' >> Server-Main is connecting to database...');
		await prisma.$connect().then(() => {
			console.info(' >> Server-Main: Prisma Database 👏👏 is ready for query.');
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

async function runWeedTextDailyDealScheduledJob() {
	// get daily deal from from database
	// schedule a chron job to send the daily deal to DailyStory SMS api, targeting the appropriate customer segment
	// save the daily deal to redis
}
export { connectDb, server };
