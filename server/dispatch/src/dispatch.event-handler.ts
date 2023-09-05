import { TextContent } from '@cd/core-lib';
import { createAdapter } from '@socket.io/redis-adapter';
import { Server } from 'socket.io';
import MasterRoomController from './cluster/master/masterroom.controller';
import {
	connectClientController,
	publishRedisClient,
	subscribeRedisClient,
} from './cluster/redis';
import { type SocketMessage } from './dispatch.types';
import { NavigateEventType, SocketEvents } from './socket/socketEvents';

const io = new Server();
io.adapter(createAdapter(publishRedisClient, subscribeRedisClient));

io.on(SocketEvents.connection, async (socket) => {
	console.info(`dispatch event: ${SocketEvents.connection}`);
	// socket.leaveAll(); // leave all rooms of this socket
	// set time connected // socket.connectedAt = new Date();

	// set lastJoinedRoom = new Date(); // set at time of joining a room
	// DISCONNECT USERS AFTER EXTENDED TIME WITH NO ACTIVITY (LAST JOINED ROOM GREATER THAN 1 HOURS)

	// the client variable and the client_connect handler below
	// some overlapping functionality, I think.
	// Be prepared to choose one approach over the other.
	// I favor Redis because it is extensible to multiple node servers

	// const client = MasterRoomsControl.SubscribeToRoom(
	// socket.id;
	// orderId
	// namespace
	// roomId
	// );

	socket.emit(SocketEvents.connection, {
		event: SocketEvents.connection,
		message: TextContent.dispatch.status.CONNECTED,
	});

	socket.on(
		SocketEvents.client_connect,
		async ({ userId, phone }: SocketMessage) => {
			console.info(`dispatch event: ${SocketEvents.client_connect}`);
			saveClient(userId, socket.id, phone);
		},
	);

	// easy way to do this is if any conneciton is made, the client class is created, and the client is added to the room.
	// drivers are added to select-driver-rooms, customers are added to order-rooms.
	// drivers are added to order-rooms when they accept an order.
	// order rooms are created simultaneously with the select-driver-room being created.

	socket.on(SocketEvents.disconnect, async (reason) => {
		console.info(
			`dispatch event: ${SocketEvents.disconnect}, reason: ${reason}`,
		);
		console.info('client disconnect, reason: ', reason);
		socket.removeAllListeners();
		// MasterRoomsControl.DisconnectClientFromRoom(client);
	});

	socket.on('error', (error) => {
		console.log(`dispatch event: error, error: ${error}`);
		// MasterRoomsControl.DisconnectClientFromRoom(client);
	});

	io.of('/').adapter.on(SocketEvents.join_room, async (room: string) => {
		console.info('dispatch event: ', SocketEvents.join_room);
		if (room.startsWith('select-driver:')) {
			try {
				// const SelectDriverRoomEvents = require("./select-driver-room");
				// new SelectDriverRoomEvents(socket, room);
				// console.info("room joined: ", room);
				// console.info("socket in the room: ", socket.id);

				// console.info(room + " roomSize: ", roomSize);

				// detect the number of sockets in the room
				// if (numSockets === 0) {
				// close the room
				// and select new Drivers for order request
				// selectDriverForDelivery(order)
				// }

				// const isDriverSelected = false;

				const roomsize = io.sockets.adapter.rooms.get(room)?.size;

				// join room event
				// check isDriverSelected from room

				let wasOccupied = false;
				let isDriverSelected = false;

				if (roomsize === undefined)
					throw new Error(TextContent.dispatch.error.ROOM_NOT_FOUND);

				if (isDriverSelected === false) {
					console.info('join-room: new room');
					wasOccupied = true;
					const orderId = getOrderIdFromRoom(room);

					// find dispatch order from dispatch_orders collection
					const order = await MasterRoomController.getDispatchOrderById(
						orderId,
					);

					io.to(room).emit(SocketEvents.new_order, {
						message: TextContent.dispatch.status.CONNECTED,
						payload: order,
					});
					console.info(`dispatch event: ${SocketEvents.new_order} emitted`);

					socket.once(SocketEvents.accept_order, async ({ userId }) => {
						console.info(`dispatch event: ${SocketEvents.accept_order}`);

						// emit to all other sockets in the room
						socket
							.in(room)
							.emit(SocketEvents.order_assigned_to_another_driver, {
								message:
									'You did not claim the order in time! Stay online to receive another order.',
							});
						console.info(
							`dispatch event: ${SocketEvents.accept_order}, 
						Driver ${userId} accepted the order ${orderId}`,
						);

						await MasterRoomController.addDriverToOrder(orderId, userId).catch(
							() => {
								throw new Error(
									`Sockethandler: Failed to add driver ${userId} to order ${orderId}.`,
								);
							},
						);
						isDriverSelected = true;
						socket.emit(SocketEvents.order_assigned, {
							message: TextContent.dispatch.status.NAVIGATE_DELIVERY,
						});

						io.in(room).socketsLeave(room);
						console.info(`dispatch: room ${room} closed`);
					});

					socket.once(SocketEvents.decline_order, () => {
						console.info(`dispatch event: ${SocketEvents.decline_order}`);
						socket.leave(room);
					});
					if (
						roomsize === 0 &&
						wasOccupied === true &&
						isDriverSelected === false
					) {
						console.info('dispatch: no driver was selected');
						// await MasterRoomController.createSelectDriverRoom();
						// refactor to repopulate the room with new drivers, or create a new room for the order
					}
				}
			} catch (error: any) {
				console.error('join-room: ', error);
				throw new Error(error.message);
			}
		}
	});
});

io.of(/^\/order:\w+$/).on(SocketEvents.connection, async (socket) => {
	const namespace = socket.nsp.name,
		orderId = getOrderIdFromRoom(namespace),
		room = `order:${orderId}`;

	// console.info("socket connected to order namespace: ", namespace);
	await socket.join(room);
	if (room.startsWith('order:')) {
		console.info(`dispatch: socket ${socket.id} joined room ${room}`);

		// TODO: When a client enters the room, the room
		// will trigger a getLocation event emitted to the driver client.
		// The driver client will response their live location.

		// figure out a way to get driverId from redis,
		// using orderId, send the driver Id to broadcast to clients,
		// using driverAdded socket event

		// console.info(
		//   "namespace room size: ",
		//   io._nsps.get(namespace).adapter.rooms.get(room).size
		// );
		const roomsize = io?._nsps?.get(namespace)?.adapter?.rooms?.get(room)?.size;

		if (!roomsize)
			throw new Error(TextContent.dispatch.error.ROOM_NOT_FOUND + ` ${room}`);

		if (roomsize > 1) {
			socket.on(SocketEvents.driver_added, ({ userId }) => {
				const driverId = userId;

				// navigate to vendor event emitted to driver client
				socket.emit(SocketEvents.navigate, {
					type: NavigateEventType.to_vendor,
				});

				// emit driver added event to customer and vendor clients
				socket.broadcast.emit(SocketEvents.driver_added, {
					data: { driverId: driverId, orderId: orderId },
				});
			});

			socket.on(SocketEvents.send_location, ({ data }) => {
				console.info(`dispatch event: ${SocketEvents.send_location}`);
				// console.info("socket " + socket.id + " shared data: ", data);
				socket.broadcast.emit(SocketEvents.send_location, {
					data: data,
				});
				console.info(`dispatch event: ${SocketEvents.send_location} emitted`);
			});

			socket.on(SocketEvents.navigate, ({ type, data }) => {
				// customer client and vendor client receiveing this socket events,
				// are not configued currently for socket namespace and discrete socket connection identifying

				// event is simply passing the orderId for clientside event handling for multiple orders

				// when driver arrives at vendor, send this socket event from client
				console.info(`dispatch event: ${SocketEvents.navigate},
				type: ${type},
				data: ${data}`);
				switch (type) {
					case NavigateEventType.arrive_to_vendor:
						console.info('dispatch: driver arrived to vendor');
						socket.broadcast.emit('message', {
							type: NavigateEventType.arrive_to_vendor,
							data: data,
						});
						break;

					case NavigateEventType.pickup_product:
						console.info('dispatch: driver picked up the product');
						socket.emit(SocketEvents.navigate, {
							type: NavigateEventType.to_customer,
						});
						socket.broadcast.emit(SocketEvents.message, {
							type: NavigateEventType.pickup_product,
							data: data,
						});
						break;

					case NavigateEventType.arrive_customer:
						console.info('dispatch: driver arrived to a customer');
						socket.broadcast.emit(SocketEvents.message, {
							type: NavigateEventType.arrive_customer,
							data: data,
						});
						break;

					case NavigateEventType.deliver_product:
						console.info(
							'dispatch: driver delivered the product to a customer',
						);
						socket.broadcast.emit(SocketEvents.message, {
							type: NavigateEventType.deliver_product,
							data: data,
						});
						break;

					default:
						console.info(`room ${room} unhandled navigate event ${type} `);
						break;
				}
			});
		}
	}
});

function saveClient(driverId: string, socketId: string, phone: string) {
	connectClientController.saveClient({ driverId, socketId, phone });
}

function getOrderIdFromRoom(roomname: string): string {
	return roomname.split(':')[1] || '';
}

export { io };

// VERIFY JWT

// import jwt, { JwtHeader, SigningKeyCallback } from 'jsonwebtoken';
// import jwksClient from 'jwks-rsa';

// // functions to fetch jwks
// var client = jwksClient({
//   jwksUri: 'http://localhost:6001/api/v1/jwt/jwks.json'
// });

// function getKey(header: JwtHeader, callback: SigningKeyCallback) {
//   client.getSigningKey(header.kid, function (err, key) {
//     var signingKey = key!.getPublicKey();
//     callback(err, signingKey);
//   });
// }

// // socket io connection
// io.use(function (socket: any, next: any) {
//   // we first try and verify the jwt from the token param.
//   if (socket.handshake.query && socket.handshake.query.token) {
//     jwt.verify(socket.handshake.query.token, getKey, {}, function (err, decoded) {
//       if (err) return next(new Error('Authentication error'));
//       socket.decoded = decoded;
//       next();
//     });
//   }
//   else {
//     next(new Error('Authentication error'));
//   }
// })
//   .on('connection', function (socket: any) {
//     // Connection now authenticated to receive further events

//     socket.on('message', function (message: string) {
//       io.emit('message', message);
//     });
//   });
