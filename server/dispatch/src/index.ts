// import prisma from '@cd/data-access';
import ClusterInit from './cluster/master/clusterInit';
import { io } from './socket/socketHandlers';
// import { MongoClient } from "mongodb";

const
    port = process.env.SERVER_DISPATCH_PORT as unknown as number;

try {
    new ClusterInit();

    global.io = io
    global.io.listen(port)

    process.send && process?.send('ready') // pm2 ready signal
    console.info(` 🚔 server-dispatch is in ${process.env.NODE_ENV} mode on port ${port}.`)
} catch (error) {
    console.info('server-dispatch error: ', error);
    process.exit(1);
}

export { };
