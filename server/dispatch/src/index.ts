import { createServer } from 'http';
import { createAdapter } from '@socket.io/redis-adapter';
import { Server } from 'socket.io';
import { Client, type SocketMessage } from './dispatch.types';
import ClusterInit from './master/cluster-init';
import { events } from './message/message-events';
import {
	connectClientController,
	subscribeWebsocketConnectClientRedis,
	websocketConnectClientRedis,
} from './redis-client';

try {
	new ClusterInit();

	const httpServer = createServer();
	global.io = new Server(httpServer);
	global.io.adapter(
		createAdapter(
			websocketConnectClientRedis,
			subscribeWebsocketConnectClientRedis,
		),
	);

	global.io.on('connection', function (socket) {
		socket.listenersAny().forEach((listener) => socket.offAny(listener)); // remove all listeners
		console.info('MASTER: connected client ', socket.id);

		socket.on(events.connection, async ({ id, phone }: SocketMessage) => {
			const client = new Client({ socketId: socket.id, id, phone });
			connectClientController.saveClient(client);
			socket.emit(events.connection, {
				event: events.connection,
				message: 'connection established',
			});
		});

		socket.on('disconnect', async () => {
			ClusterInit.deleteClientFromRoomOnMaster(socket.id);
		});

		socket.on('error', (e) => {
			// error event from socket.io
			ClusterInit.deleteClientFromRoomOnMaster(socket.id);
			console.log('MASTER ERROR: ' + e);
		});
	});

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
