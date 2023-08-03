import MasterRoomController from '../cluster/master/masterroom.controller';
import { connectClientController } from '../cluster/redis';
import { SocketEvents } from './socketEvents';
// import prisma from '@cd/data-access';
import { createAdapter } from '@socket.io/redis-adapter';
// import { MongoClient } from "mongodb";
import { Server } from 'socket.io';
import { publishRedisClient, subscribeRedisClient } from '../cluster/redis';

const io = new Server();
io.adapter(createAdapter(publishRedisClient, subscribeRedisClient));

io.on(SocketEvents.connection, async (socket) => {
	console.info('dispatch: a connection event registered.');
	// socket.leaveAll();

	// DISCONNECT USERS AFTER EXTENDED TIME WITH NO ACTIVITY (LAST JOINED ROOM GREATER THAN 1 HOURS)

	// add conditional to subscribe to different rooms, possibly based on socket event

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
		message: 'SERVER: you are connected to dispatch server.',
	});

	socket.on(SocketEvents.clientConnect, async ({ data }) => {
		// console.info("MASTER: connected client " + socket.id);
		// console.info("data: ", data);
		let { userId } = data;
		saveClient(userId, socket.id);
	});

	socket.on('disconnect', async (reason) => {
		console.info('client disconnect, reason: ', reason);
		// MasterRoomsControl.DisconnectClientFromRoom(client);
		socket.removeAllListeners();
	});
	socket.on('error', (e) => {
		// MasterRoomsControl.DisconnectClientFromRoom(client);
		console.info('MASTER ERROR: ' + e);
	});

	io.of('/').adapter.on('join-room', async (roomname: string) => {
		if (roomname.startsWith('select-driver:')) {
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

			let roomWasOccupied = false,
				isDriverAdded = false,
				roomsize = io?.sockets?.adapter?.rooms?.get(roomname)?.size;

			if (!roomsize)
				throw new Error('sockethandler: join-room: roomsize is not defined.');

			if (roomsize === 0 && !roomWasOccupied && isDriverAdded === false)
				console.info('sockethandler: join-room: new room');

			if (roomsize > 0) {
				roomWasOccupied = true;

				let orderId = getOrderIdFromRoom(roomname);

				const order = await MasterRoomController.getOrderById(orderId);

				io.to(roomname).emit(SocketEvents.newOrder, {
					message: 'You have received a new order!',
					order: order,
				});

				console.info(
					`Sockethandler: Dispatching order ${order} to ${roomsize} drivers.`
				);

				socket.once('accept_delivery_order', async ({ data }) => {
					console.info(
						`Sockethandler: Socket ${socket.id} claimed order ${order}`
					);

					socket.in(roomname).emit('order_assigned_to_another_driver', {
						message:
							'You did not claim the order in time! Stay online to receive another order.',
					});

					console.info(
						`Dispatch: accept_delivery_order received for order ${orderId}`
					);

					const { userId } = data;

					console.info(
						`Dispatch: Driver:${userId} accepted the order:${orderId}.`
					);

					await MasterRoomController.addDriverToOrder(orderId, userId)
						.then(() => {
							isDriverAdded = true;

							socket.emit('order_assigned', {
								message: 'Navigate to start delivering your order!',
							});

							// To DO: add the selected Driver to the order Room.
							// create a new socket connection from client side, to join the room
							io.in(roomname).socketsLeave(roomname);
						})
						.catch((error) => {
							throw new Error(
								`Sockethandler: Failed to add driver ${userId} to order ${orderId}.`
							);
						});

					console.info(`Dispatch: Room ${roomname} closed`);
				});

				socket.once('decline_delivery_order', () => {
					console.info(`Dispatch: Socket ${socket.id} denied the order.`);

					socket.leave(roomname);

					// if (roomSize === 0) {
					//   // console.info("no driver selected for order. Relaunching dispatch..");
					//   // console.info("socketId: ", socket.id);
					//   // send a new request for this order, to a different batch of drivers.
					// } else {
					//   console.info("room is still occupied.");
					// }
				});
			}

			if (roomsize === 0 && roomWasOccupied === true && isDriverAdded === false)
				throw new Error(
					`sockethandler: join-room: Failed to select a driver for room ${roomname}`
				);
		}
	});
});

io.of(/^\/order:\w+$/).on(SocketEvents.connection, async (socket) => {
	let namespace = socket.nsp.name,
		orderId = getOrderIdFromRoom(namespace),
		roomname = `order:${orderId}`;

	// console.info("socket connected to order namespace: ", namespace);
	await socket.join(roomname);

	if (roomname.startsWith('order:')) {
		// console.info("socket " + socket.id + " joined room: ", room);

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
		const roomsize = io?._nsps
			?.get(namespace)
			?.adapter?.rooms?.get(roomname)?.size;

		if (!roomsize)
			throw new Error('Socket handler: Order: roomsize is not defined.');

		if (roomsize > 1) {
			socket.on(SocketEvents.driverAdded, ({ data }) => {
				let { userId: driverId } = data;

				// navigate to vendor event emitted to driver client
				socket.emit('navigate', {
					type: 'NAVIGATE_TO_VENDOR',
				});

				// emit driver added event to customer and vendor clients
				socket.broadcast.emit(SocketEvents.driverAdded, {
					data: { driverId: driverId, orderId: orderId },
				});
			});

			socket.on(SocketEvents.sendLocation, ({ data }) => {
				// console.info("socket " + socket.id + " shared data: ", data);
				socket.broadcast.emit(SocketEvents.sendLocation, {
					data: data,
				});
			});

			socket.on('navigate', ({ type, data }) => {
				// customer client and vendor client receiveing this socket events,
				// are not configued currently for socket namespace and discrete socket connection identifying

				// event is simply passing the orderId for clientside event handling for multiple orders

				// when driver arrives at vendor, send this socket event from client
				console.info(
					"Sockethandler: navigate event: '\n'type: ",
					type,
					"'\n'data: ",
					data
				);
				switch (type) {
					case 'ARRIVE_TO_VENDOR':
						console.info('driver arrived to vendor');
						socket.broadcast.emit('message', {
							type: 'ARRIVE_TO_VENDOR',
							data: data,
						});
						break;

					case 'PICKUP_PRODUCT':
						console.info('driver picked up the product');
						socket.emit('navigate', {
							type: 'NAVIGATE_TO_CUSTOMER',
						});
						socket.broadcast.emit('message', {
							type: 'PICKUP_PRODUCT',
							data: data,
						});
						break;

					case 'ARRIVE_TO_CUSTOMER':
						console.info('driver arrived to customer');
						// handle different message on the client side
						socket.broadcast.emit('message', {
							type: 'ARRIVE_TO_CUSTOMER',
							data: data,
							// message: "${driver.firstName} has arrived with the delivery!",
						});
						break;

					case 'DELIVER_PRODUCT':
						console.info('driver delivered a product to customer');
						// this message may need to be configued to handle a list of orderId
						// handle completing multiple orders on the client side
						socket.broadcast.emit('message', {
							type: 'DELIVER_PRODUCT',
							data: data,
						});
						break;

					default:
						console.info('unhandled navigate event type: ', type);
						break;

					// this maybe is not valid anymore V
					// driver client:
					// check for more deliveries in the driver queue
					// note: create document watcher to watch driver distance from vendor,
					// and send event to driver to allow PICKUP_PRODUCT if they are in range.
					// send event to driver to allow ARRIVE_TO_CUSTOMER to allow delivery when in range
				}
			});
		}
	}
});

function saveClient(userId: string, socketId: string) {
	connectClientController.saveConnectedClient(userId, socketId);
}

function getOrderIdFromRoom(roomname: string): string {
	let orderId = roomname.split(':')[1] || '';
	return orderId;
}

export { io };
