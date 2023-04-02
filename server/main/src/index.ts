import prisma from '@cd/data-access';
import server from "./server";

async function connectDb() {
  try {
    await prisma.$connect()
    console.log(" 👏 Database is connected.");
  } catch(error:any) {
    console.error("Error connecting to database: ", error.stack);
    process.exit(1);
  }
}

export { connectDb, server };
