// import prisma from '@cd/data-access';
import ClusterInit from './cluster/master/clusterInit';
import { io } from './socket/socketHandlers';
// import { MongoClient } from "mongodb";

const
port = process.env.SERVER_DISPATCH_PORT as unknown as number;

new ClusterInit();

global.io = io
global.io.listen(port)

console.log(` 🚔 server-dispatch is in ${process.env.NODE_ENV} mode on port ${port}.`)

export { };
