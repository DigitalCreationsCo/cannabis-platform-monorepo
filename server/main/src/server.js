import express from "express";
import http from "http";
import socketIO from "socket.io";
import Websockets from "./utils/Websockets";
import bodyParser from "body-parser";
import cors from "cors";

import users from "./api/routes/users.route";
import vendors from "./api/routes/vendors.route";
import shop from "./api/routes/shop.route";
import drivers from "./api/routes/drivers.route";

const app = express();
const server = http.createServer(app);

global.io = socketIO(server);
global.io.on("connection", (socket) => {
  Websockets.connection(socket);
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/v1/user", users);
app.use("/api/v1/vendor", vendors);
app.use("/api/v1/shop", shop);
app.use("/api/v1/drivers", drivers);

app.use("*", (req, res) => res.status(404).json({ error: "API not found" }));

export default server;
