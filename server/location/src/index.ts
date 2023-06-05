import prisma from '@cd/data-access';
import { MongoClient } from "mongodb";
import { LocationDA } from './api/data-access';
import server from "./server";

const port = process.env.SERVER_LOCATION_PORT || 'NO_PORT_FOUND';

const mongoConnectUrl = process.env.MONGODB_SERVER_LOCATION_CLUSTER_URL

connectDb()
.then(() => {
    server.listen(port, () => {
      console.log(` ✈️ server-location listening on port ${port}.`);
      process.send('ready'); // ready signal pm2
    });
})
.catch((err) => {
    console.error('Error connecting to database: ', err.stack);
    process.exit(1);
});

async function connectDb() {
  try {
    console.info(` ✈️ server-location starting in ${process.env.NODE_ENV} mode.`);
    await MongoClient.connect(mongoConnectUrl)
    .then(async (client) => {
      await LocationDA.useMongoDB(client)
      console.log(" ✈️ server-location: Mongo Database 👏 is ready for query.");
    })
    await prisma.$connect()
    .then(async () => {
      console.log(" ✈️ server-location: Prisma Database 👏👏 is ready for query.");
    })
    .then(() => 
      console.info(' ✈️ server-location is connected to database.'));
  } catch(error:any) {
    console.error(" ✈️ server-location: Error connecting to database: ", error.stack);
    process.exit(1);
  }
}

process.on('SIGINT', async function() {
  await prisma.$disconnect()
  .then(process.exit(0))
  .catch((error:any) => process.exit(1))
});

export { connectDb, server };
