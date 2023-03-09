import prisma from '@cd/data-access';
import { MongoClient } from "mongodb";
import { LocationDA } from './api/data-access';
import server from "./server";
const mongoDBUrl = process.env.MONGODB_URL

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
