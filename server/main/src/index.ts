import server from "./server";
import {
  UserDA,
  DriverDA,
  OrganizationDA,
  OrderDA
} from "./api/data-access";
import { PrismaClient } from "@prisma/client";

async function connectDb(client: PrismaClient) {
  try {
    // await UserDA.injectDB(client);
    // await OrganizationDA.injectDB(client);
    // await DriverDA.injectDB(client);
    // await OrderDA.injectDB(client);
    console.log(" 👏 Database is connected.");
  } catch(error:any) {
    console.error("Error connecting to database: ", error.stack);
    process.exit(1);
  }
}

export { connectDb, server }