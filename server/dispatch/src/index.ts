/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable sonarjs/no-duplicate-string */
import { createServer } from 'http';
import {
	dispatchEvents,
	isEmpty,
	parseUrlFriendlyStringToObject,
	type SocketEventPayload,
} from '@cd/core-lib';
import {
	logger,
	createRequestLogger,
	createErrorLogger,
} from '@cd/core-lib/lib/logger';
import { createAdapter } from '@socket.io/redis-adapter';
import express from 'express';
import { Server } from 'socket.io';
import { fleetConfigRoutes, fleetRoutes } from 'routes/fleet.route';
import {
	Client,
	type SocketMessage,
} from '../../../packages/core-lib/src/types/dispatch.types';
import ClusterInit from './master/cluster-init';
import {
	redisDispatchClientsController,
	subscribeDispatchSockets,
	redisDispatchSockets,
	redisDispatchRoomsController,
} from './redis-dispatch';

try {
	const app = express();
	const httpServer = createServer(app);

	app.use(createRequestLogger());
	app.use('/api/v1/fleet-config', fleetConfigRoutes);

	app.post('/sms/driver-new-order', async (req, res) => {
		const body = req.body;

		let from = '';
		let text = '';
		switch (getSMSApiOrigin(req.headers['user-agent'] || '')) {
			case 'telnyx':
				if (
					JSON.parse(body).data.payload.is_spam == 'true' ||
					JSON.parse(body).data.event_type !== 'message.received'
				)
					return;
				from = JSON.parse(body).data.payload.from.phone_number;
				text = JSON.parse(body).data.payload.text;
				break;
			case 'textGrid':
				from = parseUrlFriendlyStringToObject(body).From;
				text = parseUrlFriendlyStringToObject(body).Body;
				break;
			default:
				throw new Error('unhandled sms api origin');
		}

		if (text.match(/\b1\b/)) {
			const client: Client =
				await redisDispatchClientsController.getOneClientByPhone(
					from.split('+1')[1],
				);
			if (!isEmpty(client)) {
				new ClusterInit().sendToWorker({
					action: 'accept-order',
					payload: {
						roomId: client.roomId as string,
						clients: [client],
					},
				});
			} else {
				console.error('MASTER: client not found for phone: ', from);
			}
		}
	});

	app.post('/sms/deliver-order', async (req, res) => {
		const body = req.body;

		let from = '';
		let text = '';
		switch (getSMSApiOrigin(req.headers['user-agent'] as string)) {
			case 'telnyx':
				if (
					JSON.parse(body).data.payload.is_spam == 'true' ||
					JSON.parse(body).data.event_type !== 'message.received'
				)
					return;
				from = JSON.parse(body).data.payload.from.phone_number;
				text = JSON.parse(body).data.payload.text;
				break;
			case 'textGrid':
				from = parseUrlFriendlyStringToObject(body).From;
				text = parseUrlFriendlyStringToObject(body).Body;
				break;
			default:
				console.info('unhandled sms api origin');
				return null;
		}

		if (text.match(/\b1\b/)) {
			console.info('phone ,', from.split('+1')[1]);
			const client: Client =
				await redisDispatchClientsController.getOneClientByPhone(
					from.split('+1')[1],
				);
			console.info('client retrieved using incoming sms message', client);
			if (!isEmpty(client)) {
				new ClusterInit().sendToWorker({
					action: 'accept-order',
					payload: {
						roomId: client.roomId as string,
						clients: [client],
					},
				});
			} else {
				console.error('MASTER: client not found for phone: ', from);
			}
		}
	});

	app.post('/sms/customer-receive-product', async (req, res) => {
		const body = req.body;
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
				from = parseUrlFriendlyStringToObject(body).From;
				text = parseUrlFriendlyStringToObject(body).Body;
				break;
			default:
				return null;
		}

		if (text.match(/\byes\b/)) {
			const client: Client =
				await redisDispatchClientsController.getOneClientByPhone(
					from.split('+1')[1],
				);
			if (!isEmpty(client)) {
				new ClusterInit().sendToWorker({
					action: 'order-complete',
					payload: {
						roomId: client.roomId as string,
						clients: [client],
					},
				});
			} else {
				console.error('MASTER: client not found for phone: ', from);
			}
		}
	});

	global.logger = logger;

	global.io = new Server(httpServer);
	global.io.adapter(
		createAdapter(redisDispatchSockets, subscribeDispatchSockets),
	);
	global.io.on('connection', function (socket) {
		socket.emit(dispatchEvents.connection, {
			event: dispatchEvents.connection,
			success: true,
			message: 'connection established',
			socketId: socket.id,
		});
		console.debug('a websocket client connected', socket.id);

		socket.listenersAny().forEach((listener) => socket.offAny(listener)); // remove all listeners
		socket.on('connect_client', async ({ id, phone }: SocketMessage) => {
			const client = new Client({ socketId: socket.id, userId: id, phone });
			redisDispatchClientsController.saveClient(client);
		});

		socket.on('disconnect', async () => {
			// disconnect event from socket.io
			console.info('a websocket client disconnected', socket.id);
		});

		socket.on('error', (e) => {
			console.log('MASTER ERROR: ' + e);
			throw new Error(e.message);
		});
	});

	app.use(createErrorLogger());

	new ClusterInit();

	const port = (process.env.SERVER_PORT as unknown as number) || 6041;
	httpServer.listen(port, () => {
		console.info(
			`  🚚 server-dispatch is in ${process.env.NODE_ENV} mode on port ${port}.`,
		);
	});

	// interval runs to delete vacant and completed rooms
	// 5 minutes
	setInterval(() => {
		redisDispatchRoomsController.deleteClosedRooms();
	}, 1000 * 60 * 5);
} catch (error) {
	console.error('server-dispatch error: ', error);
	process.exit(1);
}

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
