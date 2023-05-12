import prisma from '@cd/data-access';
import { MongoClient } from "mongodb";
import { LocationDA } from './api/data-access';
import server from "./server";
const mongoDBUrl = process.env.MONGODB_URL
// import { loadEnv } from '@cd/shared-config/config/loadEnv.js';
// import { config } from 'dotenv';
// import { expand } from 'dotenv-expand';

const nodeEnv = process.env.NODE_ENV;
// expand(config({ path: loadEnv(nodeEnv) }));
const port = process.env.SERVER_LOCATION_PORT || 'NO_PORT_FOUND';

connectDb()
    .then(() => {
        server.listen(port, () => {
            console.log(` 🚀 Server: LOCATION listening on port ${port}.`);
            console.info(' ♞ Server: LOCATION running in ' + nodeEnv + ' mode.');
        });
    })
    .catch((err) => {
        console.error('Error connecting to database: ', err.stack);
        process.exit(1);
    });

    async function connectDb() {
      try {
        MongoClient.connect(mongoDBUrl)
        .then (async (client) => {
          await LocationDA.useMongoDB(client)
          console.log(" 👏   Mongo Database is ready for location query.");
        }).then(async () => {
          await prisma.$connect()
          console.log(" 👏👏 Prisma Database is ready for data query.");
        })
      } catch(error:any) {
        console.error("Error connecting to database: ", error.stack);
        process.exit(1);
      }
    }

export { connectDb, server };
