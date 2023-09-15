import { createServer } from 'http';
import { isEmpty, parseUrlFriendlyString } from '@cd/core-lib';
import { createAdapter } from '@socket.io/redis-adapter';
import { Server } from 'socket.io';
import { type TextGridReturnMessagePayload } from '../src/lib/sms/sms.module';
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
		const url = new URL(req.url || '', `http://${req.headers.host}`);
		if (req.method === 'POST' && url.pathname === '/sms/driver-accept-order') {
			console.info(`MASTER: received POST request to ${url.href}`);
			console.info('url ', url);
			let body = '';
			req.on('data', (chunk) => {
				body += chunk.toString();
			});
			req.on('end', async () => {
				console.info('body ', body);
				const {
					From, // phone
					Body, // message from sms
				} = parseUrlFriendlyString(body) as TextGridReturnMessagePayload;
				if (Body.match(/\b1\b/)) {
					const client = await connectClientController.getClientByPhone(
						From.split('+1')[1],
					);
					console.info('client retrieved ', client);
					if (!isEmpty(client)) {
						new ClusterInit().sendToWorker({
							action: 'accept-order',
							payload: {
								roomId: client.roomId,
								clients: [client],
							},
						});
					} else {
						console.error('MASTER: client not found for phone: ', From);
					}
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
