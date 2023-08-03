// import prisma from '@cd/data-access';
import ClusterInit from './cluster/master/clusterInit';
import { io } from './socket/socketHandlers';
// import { MongoClient } from "mongodb";

const port = (process.env.SERVER_PORT as unknown as number) || 6041;

try {
	new ClusterInit();

	global.io = io;
	global.io.listen(port);

	console.info(
		` 🚔 server-dispatch is in ${process.env.NODE_ENV} mode on port ${port}.`,
	);
} catch (error) {
	console.info('server-dispatch error: ', error);
	process.exit(1);
}

export {};
