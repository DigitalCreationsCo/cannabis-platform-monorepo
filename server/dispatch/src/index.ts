import cluster from 'cluster';
import { createServer } from 'http';
import { dispatchEvents, isEmpty, parseUrlStringToObject } from '@cd/core-lib';
import { createAdapter } from '@socket.io/redis-adapter';
import { Server } from 'socket.io';
import {
	Client,
	type SocketMessage,
} from '../../../packages/core-lib/src/types/dispatch.types';
import ClusterInit from './master/cluster-init';
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

	// eslint-disable-next-line sonarjs/cognitive-complexity
	const httpServer = createServer(function (req, res) {
		console.info(
			cluster.isPrimary ? 'MASTER' : 'WORKER',
			' received request ',
			req.url,
		);
		// handle new order, send events to SelectDriverRoom
		// receive sms reply from driver, and send emit to room on worker
		const url = new URL(req.url || '', `http://${req.headers.host}`);
		if (req.method === 'POST' && url.pathname === '/sms/driver-new-order') {
			let body = '';
			req.on('data', (chunk) => {
				body += chunk.toString();
			});
			req.on('end', async () => {
				res.end();
				console.info('request body ', body);
				// send a response ok
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
						from = parseUrlStringToObject(body).From;
						text = parseUrlStringToObject(body).Body;
						break;
					default:
						console.info('unhandled sms api origin');
						return null;
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

		// handle deliver order, send events to DeliverOrderRoom
		// receive sms reply from users, and send emit to room on worker
		if (req.method === 'POST' && url.pathname === '/sms/deliver-order') {
			let body = '';
			req.on('data', (chunk) => {
				body += chunk.toString();
			});
			req.on('end', async () => {
				res.end();
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
						from = parseUrlStringToObject(body).From;
						text = parseUrlStringToObject(body).Body;
						break;
					default:
						console.info('unhandled sms api origin');
						return null;
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

		if (
			req.method === 'POST' &&
			url.pathname === '/sms/customer-receive-product'
		) {
			let body = '';
			req.on('data', (chunk) => {
				body += chunk.toString();
			});
			req.on('end', async () => {
				res.end();
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
						from = parseUrlStringToObject(body).From;
						text = parseUrlStringToObject(body).Body;
						break;
					default:
						console.info('unhandled sms api origin');
						return null;
				}

				/* match reply message from driver to accept
				 handle message edge cases:
				 - send a messageprofile id with every message, use it to parse the correct event
				 - see if theres a way to append metadata to telnyx webhook, so we can parse the correct event
				*/
				if (text.match(/\byes\b/)) {
					console.info('phone ,', from.split('+1')[1]);
					const client: Client =
						await connectClientController.getOneClientByPhone(
							from.split('+1')[1],
						);
					console.info('client retrieved using incoming sms message', client);

					// RIGHT NOW, THIS IS SENDING ORDER-COMPLETE EVENT,
					// IT OUGHT TO SEND CUSTOMER-RECEIVED-PRODUCT EVENT,
					// AND THEN THE ROOM WILL EMIT ORDER-COMPLETE EVENT,
					// THIS IS TESTABLE AS IS. :)

					if (!isEmpty(client)) {
						new ClusterInit().sendToWorker({
							action: 'order-complete',
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
