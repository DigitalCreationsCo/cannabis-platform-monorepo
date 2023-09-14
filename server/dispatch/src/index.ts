import { createServer } from 'http';
import { createAdapter } from '@socket.io/redis-adapter';
import { Server } from 'socket.io';
import { Client, type SocketMessage } from './dispatch.types';
import ClusterInit from './master/cluster-init';
import { dispatchEvents } from './message/message-events';
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

		socket.on(
			dispatchEvents.connection,
			async ({ id, phone }: SocketMessage) => {
				const client = new Client({ socketId: socket.id, id, phone });
				connectClientController.saveClient(client);
				socket.emit(dispatchEvents.connection, {
					event: dispatchEvents.connection,
					message: 'connection established',
				});
			},
		);

		socket.on('disconnect', async () => {
			ClusterInit.deleteClientFromRoomOnMaster(socket.id);
		});

		socket.on('error', (e) => {
			// error event from socket.io
			ClusterInit.deleteClientFromRoomOnMaster(socket.id);
			console.log('MASTER ERROR: ' + e);
		});
	});

	httpServer.addListener('request', (req) => {
		// intercept sms reply from driver, and send emit to room on worker
		if (req.method === 'POST' && req.url === '/sms/driver-accept-order') {
			console.log('MASTER: received POST request to /sms/driver-accept-order');
			let body = '';
			req.on('data', (chunk) => {
				body += chunk.toString();
			});
			req.on('end', async () => {
				console.log('MASTER: received sms/driver-accept-order message: ', body);
				const { From: phone, Body: data } = JSON.parse(body);
				const client = await connectClientController.getClientByPhone(phone);
				if (client) {
					new ClusterInit().sendToWorker({
						action: 'accept-order',
						payload: {
							roomId: client.roomId,
							clients: [client],
							message: data,
						},
					});
				} else {
					console.error('MASTER: client not found for phone: ', phone);
				}
			});
		}
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
