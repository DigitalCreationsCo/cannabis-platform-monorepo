import prisma from '@cd/data-access';
import server from "./server";
// import { loadEnv } from '@cd/shared-config/config/loadEnv';
// import { config } from 'dotenv';
// import { expand } from 'dotenv-expand';
const nodeEnv = process.env.NODE_ENV
// expand(config({ path: loadEnv(nodeEnv) }));
const port = process.env.SERVER_MAIN_PORT || 'NO_PORT_FOUND';

connectDb()
    .then(() => {
        server.listen(port, () => {
            console.log(` 🚀 Server Main listening on port ${port}.`);
            console.info(' ♞ Server Main running in ' + nodeEnv + ' mode.');
        });
    })
    .catch((err) => {
        console.error('Error connecting to database: ', err.stack);
        process.exit(1);
    });


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
