import server from "./server";
import { MongoClient } from "mongodb";
import UsersDAO from "./data-access/usersDAO";
import VendorsDAO from "./data-access/vendorsDAO";
import ShopDAO from "./data-access/shopDAO";
import DriversDAO from "./data-access/driversDAO";

const uri = process.env.DB_URI;
const port = process.env.PORT || 8000;

MongoClient.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(async (client) => {
    await UsersDAO.injectDB(client);
    await VendorsDAO.injectDB(client);
    await ShopDAO.injectDB(client);
    await DriversDAO.injectDB(client);
    console.log("  👏 MongoDB connected");

    server.listen(port, () => {
      console.log(`  🚀 auth service launching on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB: ", err.stack);
    process.exit(1);
  });

// run the mock server on 0.0.0.0 instead of localhost or 127.0.0.1.
// This makes the mock server accessible on the LAN and because Expo requires the development machine and the mobile running the Expo app to be on the same network the mock server becomes accessible too.
// This can be achieved with the following command when using json-server
// json-server --host 0.0.0.0 --port 8000 ./db.json --watch
