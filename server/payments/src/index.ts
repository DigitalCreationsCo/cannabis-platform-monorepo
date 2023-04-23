import prisma from '@cd/data-access';
import server from "./server";
// import { loadEnv } from '@cd/shared-config/config/loadEnv';
// import { config } from 'dotenv';
// import { expand } from 'dotenv-expand';

const nodeEnv = process.env.NODE_ENV
// expand(config({ path: loadEnv(nodeEnv) }));
const port = process.env.SERVER_PAYMENTS_PORT || 'xxxx';

connectDb(prisma)
    .then(() => {
        server.listen(port, () => {
            console.log(` 💰 server/payments is listening on port ${port}.`);
        });
    })
    .catch((err) => {
        console.error('Error connecting to database: ', err.stack);
        process.exit(1);
    });


async function connectDb(prisma) {
  try {
    console.info(' 💰 server/payments start in ' + nodeEnv + ' mode.');
    await prisma.$connect()
    console.log(" 💰 server/payments is connected to database.");
  } catch(error:any) {
    console.error("Error connecting to database: ", error.stack);
    process.exit(1);
  }
}

export { connectDb, server };
