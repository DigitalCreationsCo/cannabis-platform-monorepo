import { createServer } from 'http';
import { createAdapter } from '@socket.io/redis-adapter';
import { Server } from 'socket.io';
import ClusterInit from './master/cluster-init';
import {
	subscribeWebsocketConnectClientRedis,
	websocketConnectClientRedis,
} from './redis-client';

try {
	const httpServer = createServer();
	const io = new Server(httpServer);
	io.adapter(
		createAdapter(
			websocketConnectClientRedis,
			subscribeWebsocketConnectClientRedis,
		),
	);
	new ClusterInit();

	const port = (process.env.SERVER_PORT as unknown as number) || 6041;
	httpServer.listen(port, () => {
		console.info(
			`  🚚 server-dispatch is in ${process.env.NODE_ENV} mode on port ${port}.`,
		);
	});
} catch (error) {
	console.error('server-dispatch error: ', error);
	process.exit(1);
}

export {};
