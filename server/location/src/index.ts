import prisma from '@cd/data-access';
import { MongoClient } from "mongodb";
import { LocationDA } from './api/data-access';
import server from "./server";

const mongoConnectUrl = process.env.MONGODB_SERVER_LOCATION_CLUSTER_URL
// import { loadEnv } from '@cd/shared-config/config/loadEnv.js';
// import { config } from 'dotenv';
// import { expand } from 'dotenv-expand';

const nodeEnv = process.env.NODE_ENV;
// expand(config({ path: loadEnv(nodeEnv) }));
const port = process.env.SERVER_LOCATION_PORT || 'NO_PORT_FOUND';

connectDb()
.then(() => {
    server.listen(port, () => {
      console.log(` ✈️ server-location listening on port ${port}.`);
    });
})
.catch((err) => {
    console.error('Error connecting to database: ', err.stack);
    process.exit(1);
});

async function connectDb() {
  try {
    console.info(' ✈️ server-location running in ' + nodeEnv + ' mode.');
    console.info(' ✈️ server-location connecting to database... ');
    await MongoClient.connect(mongoConnectUrl)
    .then(async (client) => {
      await LocationDA.useMongoDB(client)
      console.log(" ✈️ server-location: Mongo Database 👏 is ready for query.");
    })
    .then(async () => {
      await prisma.$connect()
      console.log(" ✈️ server-location: Prisma Database 👏👏 is ready for query.");
    });
  } catch(error:any) {
    console.error(" ✈️ server-location: Error connecting to database: ", error.stack);
    process.exit(1);
  }
}

export { connectDb, server };
