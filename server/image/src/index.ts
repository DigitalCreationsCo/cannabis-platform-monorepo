import { cpuUsage } from 'process';
import { start } from 'repl';
import server from './server';

const port = process.env.SERVER_PORT || 6031;

server.listen(port, () => {

	console.info(`
 🌠 Server-Image is starting in ${process.env.NODE_ENV} mode.`);
	console.info(` 🌠 Server-Image is running on port ${port}.`);

	// measure cpu usage
	const startCpuUsage = process.cpuUsage();
	const now = Date.now();
	while (Date.now() - now < 1000);
	console.info(` 
 CPU Usage:`, 
	process.cpuUsage(startCpuUsage)
	);

	// measure memory usage
	console.info(` 
 Memory Usage:`, 
	process.memoryUsage()
	);
});



process.on('SIGINT', async function (err) {
	try {
		process.exit(0);
	} catch (error: any) {
		process.exit(1);
	}
});

export { server };
