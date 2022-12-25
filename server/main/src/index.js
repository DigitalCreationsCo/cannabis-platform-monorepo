import server from "./server";
import prisma from "@cd/data-access";
import {
  UserDA,
  ShopDA,
  DriverDA,
  OrganizationDA
} from "./api/data-access";
const port = process.env.PORT || 8001;

async function connectDb(client) {
  await UserDA.injectDB(client);
  await OrganizationDA.injectDB(client);
  await ShopDA.injectDB(client);
  await DriverDA.injectDB(client);
  console.log(" 👏 Database is connected.");
}
connectDb(prisma)
  .then(() => {
    server.listen(port, () => {
      console.log(` 🚀 main server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to database: ", err.stack);
    process.exit(1);
  });