import prisma from '@cd/data-access';
import { MongoClient } from "mongodb";
import { OrderDA } from './api/data-access';
import server from "./server";

// import { loadEnv } from '@cd/shared-config/config/loadEnv';
// import { config } from 'dotenv';
// import { expand } from 'dotenv-expand';
// expand(config({ path: loadEnv(nodeEnv) }));
const port = process.env.SERVER_MAIN_PORT || 'NO_PORT_FOUND';

const mongoConnectUrl = process.env.MONGODB_SERVER_DISPATCH_CLUSTER_URL
connectDb()
    .then(() => {
        server.listen(port, () => {
            console.log(` >> server-main is listening on port ${port}.`);
        });
    })
    .catch((err) => {
        console.error('Error connecting to database: ', err.stack);
        process.exit(1);
    });


async function connectDb() {
  try {
    console.info(` >> server-main start in ${process.env.NODE_ENV} mode.`);
    await MongoClient.connect(mongoConnectUrl)
    .then(async (client) => {
      await OrderDA.useMongoDB(client)
      console.log(" >> server-main: Mongo Database 👏 is ready for query.");
    })
    await prisma.$connect()
    .then(() => {
      console.log(" >> server-main: Prisma Database 👏👏 is ready for query.")
    });
    console.info(" >> server-main is connected to database.");
  } catch(error:any) {
    console.error(" >> server-main: Error connecting to database: ", error.stack);
    process.exit(1);
  }
}

export { connectDb, server };
