import prisma from '@cd/data-access';
import server from './server';

const port = process.env.SERVER_PORT || 6021;

connectDb()
	.then(() => {
		server.listen(port, () => {
			console.info(
				` 💰 Server-Payments starting in ${process.env.NODE_ENV} mode.`,
			);
			console.info(` 💰 Server-Payments is listening on port ${port}.`);

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

async function connectDb() {
	try {
		await prisma
			.$connect()
			.then(async () => {
				console.info(
					' 💰 Server-Payments: Prisma Database 👏👏 is ready for query.',
				);
			})
			.then(() =>
				console.info(' 💰 Server-Payments is connected to database.'),
			);
	} catch (error: any) {
		console.error(
			' 💰 Server-Payments: Error connecting to database: ',
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
