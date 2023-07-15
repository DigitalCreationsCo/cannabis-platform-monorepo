import prisma from '@cd/data-access';
import server from "./server";

const port = process.env.SERVER_PAYMENTS_PORT || 'NO_PORT_FOUND';

connectDb()
  .then(() => {
    server.listen(port, () => {
      console.info(` 💰 server-payments is listening on port ${port}.`);
      process.send('ready'); // ready signal pm2
    });
  })
  .catch((err) => {
    console.error('Error connecting to database: ', err.stack);
    process.exit(1);
  });


async function connectDb() {
  try {
    console.info(` 💰 server-payments starting in ${process.env.NODE_ENV} mode.`);
    await prisma.$connect()
      .then(async () => {
        console.info(" 💰 server-payments: Prisma Database 👏👏 is ready for query.");
      })
      .then(() =>
        console.info(" 💰 server-payments is connected to database."));
  } catch (error: any) {
    console.error(" 💰 server-payments: Error connecting to database: ", error.stack);
    process.exit(1);
  }
}

process.on('SIGINT', async function () {
  await prisma.$disconnect()
    .then(process.exit(0))
    .catch((error: any) => process.exit(1))
});

export { connectDb, server };
