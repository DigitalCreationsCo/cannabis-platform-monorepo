import server from './server';

const port = process.env.SERVER_PORT || 6031;

server.listen(port, () => {
	console.info(` 🌠 server-image start in ${process.env.NODE_ENV} mode.`);
	console.info(` 🌠 server-image is listening on port ${port}.`);
});

process.on('SIGINT', async function (err) {
	try {
		process.exit(0);
	} catch (error: any) {
		process.exit(1);
	}
});

export { server };
