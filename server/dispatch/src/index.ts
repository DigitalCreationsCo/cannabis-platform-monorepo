// import prisma from '@cd/data-access';
import { createAdapter } from '@socket.io/redis-adapter';
import ClusterInit from 'cluster/master/clusterInit';
// import { MongoClient } from "mongodb";
import { Server } from 'socket.io';
import socketHandlers from 'socket/socketHandlers';
import { publishRedisClient, subscribeRedisClient } from './cluster/redis';

const 
io = new Server();

global.io = io;
global.io.adapter(createAdapter(publishRedisClient, subscribeRedisClient));
global.io.on('connection', socketHandlers);

const
port = process.env.SERVER_DISPATCH_PORT as unknown as number;

new ClusterInit();

io.listen(port)
console.log(` 🚔 server-dispatch is in ${process.env.NODE_ENV} mode on port ${port}.`)

