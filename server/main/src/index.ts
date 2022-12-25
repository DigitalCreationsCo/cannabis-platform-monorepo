import server from "./server";
import {
  UserDA,
  ShopDA,
  DriverDA,
  OrganizationDA
} from "./api/data-access";

async function connectDb(client) {
  try {
    await UserDA.injectDB(client);
    await OrganizationDA.injectDB(client);
    await ShopDA.injectDB(client);
    await DriverDA.injectDB(client);
    console.log(" 👏 Database is connected.");
  } catch(error) {
    console.error("Error connecting to database: ", error.stack);
    process.exit(1);
  }
}
// connectDb(prisma)
//   .then(() => {
//     server.listen(port, () => {
//       console.log(` 🚀 main server listening on port ${port}`);
//     });
//   })
//   .catch((err) => {
//     console.error("Error connecting to database: ", err.stack);
//     process.exit(1);
//   });

  export { connectDb, server }