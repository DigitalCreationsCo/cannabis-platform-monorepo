import prisma from '@cd/data-access';
import { MongoClient } from "mongodb";
import { DriverDA, OrderDA } from './api/data-access';
import server from "./server";

const port = process.env.SERVER_MAIN_PORT || 'NO_PORT_FOUND';

const mongoConnectUrl = process.env.MONGODB_CONNECTION_URL

connectDb()
    .then(() => {
        server.listen(port, () => {
            console.log(` >> server-main is listening on port ${port}.`);
            process.send('ready'); // ready signal pm2
        });
    })
    .catch((err) => {
        console.error('Error connecting to database: ', err.stack);
        process.exit(1);
    });


async function connectDb() {
  try {
    console.info(` >> server-main starting in ${process.env.NODE_ENV} mode.`);
    await MongoClient.connect(mongoConnectUrl)
    .then(async (client) => {
      await OrderDA.useMongoDB(client)
      await DriverDA.useMongoDB(client)
      console.log(" >> server-main: Mongo Database 👏 is ready for query.");
      
      await prisma.$connect()
    })
    .then(async () => {
      console.log(" >> server-main: Prisma Database 👏👏 is ready for query.");
    })
    .then(() => 
      console.info(" >> server-main is connected to database."));
  } catch(error:any) {
    console.error(" >> server-main: Error connecting to database: ", error.stack);
    process.exit(1);
  }
}

process.on('SIGINT', async function() {
  await prisma.$disconnect()
  .then(process.exit(0))
  .catch((error:any) => process.exit(1))
});

  export { connectDb, server };

