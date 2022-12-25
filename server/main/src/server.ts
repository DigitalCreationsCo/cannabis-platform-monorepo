import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";
// import * as routes from './api/routes'
import { user, organization, shop, driver } from "./api/routes";

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/v1/user", user);
app.use("/api/v1/organization", organization);
app.use("/api/v1/driver", driver);
app.use("/api/v1/shop", shop);

app.use("*", (req, res) => res.status(404).json({ error: "API not found" }));

export default server;
