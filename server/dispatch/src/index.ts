import cluster from 'cluster';
import { createServer } from 'http';
import { isEmpty, parseUrlFriendlyString } from '@cd/core-lib';
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

	// 5 minutes
	// setInterval(() => {
	// 	dispatchRoomController.deleteClosedRooms();
	// }, 1000 * 60 * 5);

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
			// disconnect event from socket.io
		});

		socket.on('error', (e) => {
			// error event from socket.io
			console.log('MASTER ERROR: ' + e);
		});
	});

	// eslint-disable-next-line sonarjs/cognitive-complexity
	httpServer.addListener('request', (req) => {
		console.info(
			cluster.isPrimary ? 'MASTER' : 'WORKER',
			' received request ',
			req.url,
		);

		// receive sms reply from driver, and send emit to room on worker
		const url = new URL(req.url || '', `http://${req.headers.host}`);
		if (req.method === 'POST' && url.pathname === '/sms/driver-new-order') {
			let body = '';
			req.on('data', (chunk) => {
				body += chunk.toString();
			});
			req.on('end', async () => {
				console.info('request body ', body);

				// let to = '';
				let from = '';
				let text = '';
				switch (getSMSApiOrigin(req.headers['user-agent'] as string)) {
					case 'telnyx':
						// verify webhook signatures from telnyx
						if (
							JSON.parse(body).data.payload.is_spam == 'true' ||
							JSON.parse(body).data.event_type !== 'message.received'
						)
							return;
						from = JSON.parse(body).data.payload.from.phone_number;
						text = JSON.parse(body).data.payload.text;
						break;
					case 'textGrid':
						// type TextGridReturnMessagePayload
						from = parseUrlFriendlyString(body).From;
						text = parseUrlFriendlyString(body).Body;
						break;
					default:
						console.info('unhandled sms api origin');
				}

				/* match reply message from driver to accept
				 handle message edge cases:
				 - send a messageprofile id with every message, use it to parse the correct event
				 - see if theres a way to append metadata to telnyx webhook, so we can parse the correct event
				*/
				if (text.match(/\b1\b/)) {
					console.info('phone ,', from.split('+1')[1]);
					const client: Client =
						await connectClientController.getOneClientByPhone(
							from.split('+1')[1],
						);
					console.info('client retrieved using incoming sms message', client);
					if (!isEmpty(client)) {
						new ClusterInit().sendToWorker({
							action: 'accept-order',
							payload: {
								roomId: client.roomId,
								clients: [client],
							},
						});
					} else {
						console.error('MASTER: client not found for phone: ', from);
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

function getSMSApiOrigin(userAgent: string) {
	if (userAgent.includes('telnyx')) {
		return 'telnyx';
	} else if (userAgent.includes('textgrid')) {
		return 'textGrid';
	} else {
		console.info('getSMSApiOrigin: unhandled userAgent ', userAgent);
		return '';
	}
}
